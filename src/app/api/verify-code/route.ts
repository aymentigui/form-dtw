import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, code } = await req.json()

  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      email,
      code,
      expiresAt: { gt: new Date() },
    },
  })

  if (!verificationCode) {
    return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 400 })
  }

  // Supprimer le code vérifié
  await prisma.verificationCode.delete({
    where: {
      id: verificationCode.id,
    },
  })

  return NextResponse.json({ message: 'Code vérifié avec succès' })
}

