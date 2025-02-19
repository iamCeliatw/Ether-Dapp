'use client'

import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import dayjs from 'dayjs'
interface ChartData {
  time: string
  price: number
}
type TimeRange = '1w' | '1m' | '1y' | '5y'
const timeRanges = [
  { label: '5Y', value: '5y' as TimeRange },
  { label: '1Y', value: '1y' as TimeRange },
  // { label: '1M', value: '1m' as TimeRange },
  // { label: '1W', value: '1w' as TimeRange },
]

function filterDataByRange(
  data: ChartData[],
  range: '1w' | '1m' | '1y' | '5y'
): ChartData[] {
  if (!data || data.length === 0) return []

  const now = new Date()
  const fromDate = new Date()

  switch (range) {
    case '1w':
      fromDate.setDate(now.getDate() - 7)
      break
    case '1m':
      fromDate.setDate(now.getDate() - 30)
      break
    case '1y':
      fromDate.setDate(now.getDate() - 365)
      break
    case '5y':
      fromDate.setDate(now.getDate() - 1825)
      break
  }

  return data.filter((row) => {
    const rowDate = new Date(row.time)
    return rowDate >= fromDate && rowDate <= now
  })
}
const SimpleLineChart = () => {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  // 新增一個 state 來儲存使用者選擇的區間
  const [timeRange, setTimeRange] = useState<'1w' | '1m' | '1y' | '5y'>('1y')
  const fetchDuneData = async () => {
    try {
      setLoading(true)

      const queryId = '4480458'
      const apiUrl = `/api/dune?queryId=${queryId}&limit=10000`

      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const json = await response.json()
      // console.log(json.result.rows)
      const duneResults = json.result.rows.map((row: ChartData) => ({
        time: row.time.split(' ')[0],
        price: Math.round(row.price * 100) / 100,
      }))
      console.log(duneResults)
      setData(duneResults)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message)
      } else {
        console.error('Error fetching data:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDuneData()
  }, [])
  // 根據 timeRange 篩選後的資料
  const filteredData = filterDataByRange(data, timeRange)

  // 監聽按鈕的點擊，更新 state
  const handleRangeChange = (range: '1w' | '1m' | '1y' | '5y') => {
    setTimeRange(range)
  }
  let lastYear = ''
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="flex gap-4 mb-4">
        {/* 
          根據 state 高亮 / 變色或做出選中效果，可加條件判斷
        */}
        <div className="flex gap-4 mb-4">
          {timeRanges.map((item) => (
            <button
              key={item.value}
              onClick={() => handleRangeChange(item.value)}
              className={
                timeRange === item.value
                  ? 'text-[#fff]' // 選中時
                  : 'text-gray-400 hover:text-[#fff]' // 未選中
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <p className="text-[#fff]">Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="time"
              interval={
                timeRange === '5y'
                  ? 'preserveStart'
                  : timeRange === '1y'
                  ? 30
                  : 0
              }
              padding={{ left: 10, right: 10 }}
              tick={{ fill: '#fff' }}
              tickFormatter={(value) => {
                if (timeRange === '5y') {
                  // 只顯示年份
                  const year = dayjs(value).format('YYYY')
                  if (year !== lastYear) {
                    lastYear = year
                    return year
                  }
                  return ''
                } else if (timeRange === '1y') {
                  return dayjs(value).format('MMM')
                } else {
                  return dayjs(value).format('DD')
                }
              }}
            />

            <YAxis
              tick={{ fill: '#fff' }}
              orientation="right" // 讓 Y 軸字體變為白色
            />
            <Tooltip cursor={{ stroke: '#F0D85A', strokeWidth: 1 }} />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#F0D85A"
              dot={false}
              strokeWidth={2}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default SimpleLineChart
