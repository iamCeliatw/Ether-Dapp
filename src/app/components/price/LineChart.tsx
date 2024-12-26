'use client'

import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

interface ChartData {
  date: string
  price: number
}

const SimpleLineChart = () => {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDuneData = async () => {
    try {
      setLoading(true)

      const queryId = '4480458'
      const apiUrl = `/api/dune?queryId=${queryId}&limit=1000`

      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const json = await response.json()
      const duneResults = json.result.rows.map((row: any) => ({
        date: row.time.split(' ')[0],
        price: row.price,
      }))

      setData(duneResults)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDuneData()
  }, [])

  return (
    <div>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#F0D85A"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
    </div>
  )
}

export default SimpleLineChart
