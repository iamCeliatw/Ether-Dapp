// app/price/ChartClientWrapper.tsx
'use client'

import dynamic from 'next/dynamic'

// 動態匯入你的 SimpleLineChart
const SimpleLineChart = dynamic(() => import('./LineChart'), {
  ssr: false,
})

export default function ChartClientWrapper() {
  return <SimpleLineChart />
}
