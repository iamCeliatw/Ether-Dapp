// 'use client'
import React from 'react'
import EthToUsd from '../components/price/EthToUsd'
import ChartClientWrapper from '../components/price/ChartClientWrapper'
// ❶ 在這裡可以設定 metadata
export const metadata = {
  title: 'Ether Price',
  description: '',
}

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex-[7_7_0%] p-4 rounded-md shadow-md h-[500px]">
        {<ChartClientWrapper />}
      </div>
      <div className="flex-[3_3_0%] p-4 rounded-md shadow-md">
        <EthToUsd ethPrice={1300} />
      </div>
    </div>
  )
}

export default Layout
