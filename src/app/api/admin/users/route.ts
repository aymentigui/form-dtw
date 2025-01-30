import { NextResponse } from 'next/server'
import { auth } from '@/app/util/auth'
import { prisma } from '@/app/util/db'


export async function GET(req: Request) {

  const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
  

  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '100')
  const search = url.searchParams.get('search') || ''
  const dateFrom = url.searchParams.get('dateFrom')
  const dateTo = url.searchParams.get('dateTo')

  const where = {
    AND: [
      {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { societyName: { contains: search } },
        ],
      },
      dateFrom ? { createdAt: { gte: new Date(dateFrom) } } : {},
      dateTo ? { createdAt: { lte: new Date(dateTo) } } : {},
    ],
  }

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        isSociety: true,
        societyName: true,
        arabicName: true,
        address: true,
        dateOfBirth: true,
        phoneNumber: true,
        activityType: true,
        nin: true,
        transporterNumber: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ])

  const totalPages = Math.ceil(totalUsers / limit)

  return NextResponse.json({
    users,
    totalUsers,
    totalPages,
  })
}

