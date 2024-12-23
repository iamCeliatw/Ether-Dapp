'use client'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const data = [
  { name: 'Jan', price: 1200 },
  { name: 'Feb', price: 1250 },
  { name: 'Mar', price: 1300 },
  { name: 'Apr', price: 1280 },
  { name: 'May', price: 1290 },
  { name: 'Jun', price: 1320 },
]

const SimpleLineChart = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
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
  )
}

export default SimpleLineChart
