import { prisma } from '@/app/util/db'
import { NextResponse } from 'next/server'

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

