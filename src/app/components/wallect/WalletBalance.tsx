// components/WalletBalance.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'

interface WalletBalanceProps {
  account: string
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ account }) => {
  const [balance, setBalance] = useState<string>('')

  const getBalance = useCallback(async () => {
    try {
      if (!window.ethereum) {
        console.log('請安裝 MetaMask!')
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const balanceBigNumber = await provider.getBalance(account)
      const balanceInEth = ethers.formatEther(balanceBigNumber)
      console.log('餘額:', balanceInEth, balanceBigNumber)
      setBalance(balanceInEth)
    } catch (error) {
      console.log(error)
    }
  }, [account])

  useEffect(() => {
    if (account) {
      getBalance()
    }
  }, [account, getBalance])

  return (
    <div className="mt-4">
      <p className="text-[#fff]"> 餘額: {balance} ETH</p>
    </div>
  )
}

export default WalletBalance
