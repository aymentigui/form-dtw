"use server"

import { z } from "zod"
import { defaultRedirect } from "@/app/util/routes"
//import { AuthError } from "next-auth"
import { signIn, signOut } from "@/app/util/auth"
import { LoginSchema } from "@/app/util/schema/user"
import { addMinutes, isBefore } from "date-fns";
import prisma from "@/app/util/db"
import { redirect } from "next/navigation"
const domainUrl = process.env.DOMAIN_URL;

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validateFileds = LoginSchema.safeParse(data);

    if (!validateFileds.success) {
        return { error: "Invalid infos" };
    }

    const { email, password } = validateFileds.data;

    try {
        // Récupérer les informations de tentative de connexion
        const userAttempts = await prisma.loginAttempt.findUnique({
            where: { email },
        });

        const currentTime = new Date();

        if (userAttempts) {
            // Si l'utilisateur est bloqué, vérifiez le délai
            if (userAttempts.isBlocked && userAttempts.unblockTime  && isBefore(currentTime, userAttempts.unblockTime)) {
                return { error: "Too many failed attempts. Please try again later." };
            }

            // Réinitialiser les tentatives si le blocage est expiré
            if (userAttempts.isBlocked && userAttempts.unblockTime && isBefore(userAttempts.unblockTime, currentTime)) {
                await prisma.loginAttempt.update({
                    where: { email },
                    data: { isBlocked: false, attempts: 0, unblockTime: null },
                });
            }
        }

        await signIn("credentials", {
            email,
            password,
            redirectTo:'www.dtwmt-dz.com/admin/dashboard'
        });
        // Si la connexion réussit, réinitialisez les tentatives
        await prisma.loginAttempt.delete({
            where: { email },
        });

        return { success: true };
    } catch (error) {
        // @ts-ignore
        if (error.name === "CredentialsSignin") {
            // Gestion des tentatives d'échec
            const maxAttempts = 5;
            const blockDuration = 15; // en minutes
            const userAttempts = await prisma.loginAttempt.findUnique({
                where: { email },
            });
            if (!userAttempts) {
                // Créez une nouvelle entrée si elle n'existe pas
                await prisma.loginAttempt.create({
                    data: {
                        email,
                        attempts: 1,
                        isBlocked: false,
                    },
                });
            } else {
                let attempts = userAttempts.attempts + 1;
                let isBlocked = attempts >= maxAttempts;
                const currentTime = new Date(); 
                let unblockTime = isBlocked ? addMinutes(currentTime, blockDuration) : null;

                await prisma.loginAttempt.update({
                    where: { email },
                    data: {
                        attempts,
                        isBlocked,
                        unblockTime,
                    },
                });

                if (isBlocked) {
                    return { error: "Too many failed attempts. Please try again later." };
                }
            }

            return { error: "Invalid email or password" };
        }

        throw error;
    }
};


export const logOut=async ()=>{
    await signOut({redirectTo:'www.dtwmt-dz.com/auth/login'})
}