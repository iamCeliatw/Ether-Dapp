// components/WalletBalance.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

interface WalletBalanceProps {
  account: string
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ account }) => {
  const [balance, setBalance] = useState<string>('')

  const getBalance = async () => {
    try {
      if (!(window as any).ethereum) {
        console.log('請安裝 MetaMask!')
        return
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum)
      const balanceBigNumber = await provider.getBalance(account)
      const balanceInEth = ethers.formatEther(balanceBigNumber)
      console.log('餘額:', balanceInEth, balanceBigNumber)
      setBalance(balanceInEth)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (account) {
      getBalance()
    }
  }, [account])

  return (
    <div className="mt-4">
      <p className="text-[#fff]"> 餘額: {balance} ETH</p>
    </div>
  )
}

export default WalletBalance
