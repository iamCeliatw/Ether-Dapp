// EthToUsd.tsx
'use client'
import React, { useState } from 'react'

interface EthToUsdProps {
  ethPrice: number
}

const EthToUsd: React.FC<EthToUsdProps> = ({ ethPrice }) => {
  const [ethAmount, setEthAmount] = useState<number | string>('')
  const [usdValue, setUsdValue] = useState<number>(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setEthAmount(e.target.value)
    setUsdValue(!isNaN(value) ? value * ethPrice : 0)
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">ETH to USD Converter</h2>
      <div className="mb-4">
        <label
          htmlFor="eth"
          className="block text-sm font-medium text-gray-700"
        >
          ETH Amount:
        </label>
        <input
          id="eth"
          type="number"
          step="0.01"
          value={ethAmount}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">
          Equivalent in USD:{' '}
          <span className="font-bold">${usdValue.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}

export default EthToUsd
