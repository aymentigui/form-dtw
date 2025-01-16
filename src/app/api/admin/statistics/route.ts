import { NextResponse } from 'next/server'
import { auth } from '@/app/util/auth'
import { prisma } from '@/app/util/db'


export async function GET(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  // Calculer la date d'il y a 12 mois
  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11)
  twelveMonthsAgo.setDate(1)
  twelveMonthsAgo.setHours(0, 0, 0, 0)

  // Récupérer toutes les statistiques nécessaires
  const [societyStats, activityStats, monthlyRegistrations] = await Promise.all([
    // Statistiques société vs non-société
    prisma.user.groupBy({
      by: ['isSociety'],
      _count: true,
    }),

    // Statistiques par type d'activité
    prisma.user.groupBy({
      by: ['activityType'],
      _count: true,
    }),

    // Inscriptions mensuelles des 12 derniers mois
    prisma.user.findMany({
      where: {
        createdAt: {
          gte: twelveMonthsAgo,
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    }),
  ])

  // Traiter les données pour les inscriptions mensuelles
  const monthlyData: { [key: string]: number } = {}
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  }).reverse()

  // Initialiser tous les mois à 0
  months.forEach(month => {
    monthlyData[month] = 0
  })

  // Compter les inscriptions par mois
  monthlyRegistrations.forEach(registration => {
    const month = registration.createdAt.toLocaleDateString('fr-FR', { 
      month: 'long',
      year: 'numeric'
    })
    monthlyData[month] = (monthlyData[month] || 0) + 1
  })

  return NextResponse.json({
    societyStats: societyStats.map(stat => ({
      name: stat.isSociety ? 'Société' : 'Individu',
      value: stat._count,
    })),
    activityStats: activityStats.map(stat => ({
      name: stat.activityType || 'Non spécifié',
      value: stat._count,
    })),
    monthlyData: Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count,
    })),
  })
}

