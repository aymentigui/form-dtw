import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@/app/util/auth'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
  

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    select: {
      createdAt: true,
    },
  })

  const monthlyStats: { [key: string]: number } = {}

  users.forEach((user:any) => {
    const month = user.createdAt.toLocaleString('default', { month: 'long' })
    monthlyStats[month] = (monthlyStats[month] || 0) + 1
  })

  return NextResponse.json(monthlyStats)
}

