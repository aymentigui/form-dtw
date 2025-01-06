import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendEmail } from '@/lib/email'
import QRCode from 'qrcode'
import path from 'path'
import fs from 'fs';
import { getUserConfirmationTemplate } from '@/app/templates/confermation'
import { registrationSchema } from '@/lib/schcema'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    // Récupérer les données de la requête
    const userData = await req.json()
    const {email,...data}=userData
    const result = registrationSchema.safeParse(data);
    if (!result.success) {
      // Retourner les erreurs de validation
      return NextResponse.json({ 
        error: "Données invalides", 
        issues: result.error.issues 
      }, { status: 400 });
    }

    // Vérifier si les données de l'utilisateur sont valides
    if (!userData) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    }
    userData.dateOfBirth =new Date(userData.dateOfBirth)

    // Créer l'utilisateur dans la base de données
    const user = await prisma.user.create({
      data: userData,
    })

    // Générer le QR code
    const qrCodeDataUrl = await QRCode.toDataURL(user.id)
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
    let publicUrl="/logo.png"
    
    try {
      // Définir le chemin du fichier où l'image sera enregistrée
      const qrFolderPath = path.join(process.cwd(), 'public', 'qr');
      const filePath = path.join(qrFolderPath, `${user.id}.png`);
      // Créer le dossier 'public/qr' s'il n'existe pas
      if (!fs.existsSync(qrFolderPath)) {
        fs.mkdirSync(qrFolderPath, { recursive: true });
      }

      // Sauvegarder l'image en tant que fichier PNG
      fs.writeFileSync(filePath, base64Data, 'base64');
      publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/qr/${user.id}.png`;
    } catch (error) {
      console.log("erreur lorsque la creation de ficher")
    }

    // Envoyer l'email de confirmation avec le QR code
    await sendEmail(
      user.email,
      'Inscription confirmée',
      getUserConfirmationTemplate(user, publicUrl)
    );

    return NextResponse.json({ message: 'Utilisateur enregistré avec succès', userId: user.id })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

