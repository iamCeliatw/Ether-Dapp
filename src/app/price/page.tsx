// Layout.tsx
import React from 'react'
import SimpleLineChart from '../components/price/LineChart'
import EthToUsd from '../components/price/EthToUsd'

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* 左側折線圖 */}
      <div className="flex-[3_3_0%] bg-gray-100 p-4 rounded-md shadow-md">
        <SimpleLineChart />
      </div>

      {/* 右側 ETH to USD 輸入區域 */}
      <div className="flex-[2_2_0%]">
        <EthToUsd ethPrice={1300} />
      </div>
    </div>
  )
}

export default Layout
