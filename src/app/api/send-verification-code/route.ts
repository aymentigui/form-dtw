import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { getSendVerificationCodeTemplate } from '@/app/templates/send-verification-code'
import { prisma } from '@/app/util/db'



export async function POST(req: Request) {
  console.log("ok")
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Vérifier si un utilisateur existe déjà avec cet email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    // Générer un code de vérification à 6 chiffres
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Sauvegarder le code dans la base de données
    await prisma.verificationCode.create({
      data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // Expire dans 15 minutes
      },
    })
    const emailContent = getSendVerificationCodeTemplate(code);

    // Envoyer l'email
    await sendEmail(email, 'Code de vérification', emailContent);

    return NextResponse.json({ message: 'Code de vérification envoyé' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to process request', details: error.message }, { status: 500 })
  }
}
