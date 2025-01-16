// components/PieChartComponent.tsx
import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ClipLoader } from 'react-spinners'

interface PieChartProps {
  data: Array<{ name: string; value: number }>
  total: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function PieChartComponent({ data, total }: PieChartProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data.length) {
      setLoading(false)
    }
  }, [data])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={40} color="#00C49F" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name} (${Math.round((value / total) * 100)}%)`}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
