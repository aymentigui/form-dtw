// components/LineChartComponent.tsx
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ClipLoader } from 'react-spinners'

interface LineChartProps {
  data: Array<{ month: string; count: number }>
}

export default function LineChartComponent({ data }: LineChartProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data.length) {
      setLoading(false)
    }
  }, [data])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={40} color="#8884D8" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" name="Nombre d'inscriptions" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
