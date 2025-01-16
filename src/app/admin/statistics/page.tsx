"use client"
// pages/statistics.tsx
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PieChartComponent from '@/componenets/PieChartComponent';
import LineChartComponent from '@/componenets/LineChartComponent';

interface ChartData {
  societyStats: Array<{ name: string; value: number }>
  activityStats: Array<{ name: string; value: number }>
  monthlyData: Array<{ month: string; count: number }>
}

export default function Statistics() {
  const [chartData, setChartData] = useState<ChartData | null>(null)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    const response = await fetch('/api/admin/statistics')
    const data = await response.json()
    setChartData(data)
  }

  if (!chartData) {
    return <div>Chargement des statistiques...</div>
  }

  const totalSociety = chartData.societyStats.reduce((acc, curr) => acc + curr.value, 0)
  const totalActivity = chartData.activityStats.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Statistiques</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Statistiques Société vs Individu */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition Société vs Individu</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[300px] h-[300px]">
              <PieChartComponent data={chartData.societyStats} total={totalSociety} />
            </div>
          </CardContent>
        </Card>

        {/* Statistiques par type d'activité */}
        <Card>
          <CardHeader>
            <CardTitle>Types d'activités</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[300px] h-[300px]">
              <PieChartComponent data={chartData.activityStats} total={totalActivity} />
            </div>
          </CardContent>
        </Card>

        {/* Inscriptions mensuelles */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Inscriptions mensuelles (12 derniers mois)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <LineChartComponent data={chartData.monthlyData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
