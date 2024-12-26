'use client'

import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

interface EthToUsdProps {
  ethPrice?: number // 預設匯率，作為備用
}

const EthToUsd: React.FC<EthToUsdProps> = ({ ethPrice = 0 }) => {
  const [currentEthPrice, setCurrentEthPrice] = useState<number>(ethPrice)
  const [ethAmount, setEthAmount] = useState<string>('')
  const [usdValue, setUsdValue] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        setLoading(true)
        // 使用 Infura 或其他節點獲取 Chainlink 餵價
        const provider = new ethers.providers.JsonRpcProvider(
          `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_API_KEY}`
        )
        const priceFeedAddress = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
        const priceFeedAbi = [
          {
            inputs: [],
            name: 'latestRoundData',
            outputs: [
              { internalType: 'uint80', name: 'roundId', type: 'uint80' },
              { internalType: 'int256', name: 'answer', type: 'int256' },
              { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
              { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
              {
                internalType: 'uint80',
                name: 'answeredInRound',
                type: 'uint80',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ]
        const contract = new ethers.Contract(
          priceFeedAddress,
          priceFeedAbi,
          provider
        )
        const latestRoundData = await contract.latestRoundData()
        const price = Number(latestRoundData.answer) / 10 ** 8 // Chainlink 價格有 8 位小數
        setCurrentEthPrice(price)
      } catch (error) {
        console.error('Error fetching ETH price:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEthPrice()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEthAmount(value)
    setUsdValue(parseFloat(value) * currentEthPrice)
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">ETH to USD Converter</h2>
      {loading ? (
        <p>Loading price...</p>
      ) : (
        <p className="mb-4 text-sm text-gray-600">
          Current ETH/USD: ${currentEthPrice.toFixed(2)}
        </p>
      )}
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
          <span className="font-bold">
            {ethAmount ? `${usdValue.toFixed(2)}` : '0.00'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default EthToUsd
