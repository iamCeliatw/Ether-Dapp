// components/ConnectWallet.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface ConnectWalletProps {
  onAccountChange: (account: string | null) => void
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onAccountChange }) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null)

  // 檢查錢包是否已連接
  const checkIfWalletIsConnected = useCallback(async () => {
    const { ethereum } = window

    if (!ethereum) {
      console.log('請安裝 MetaMask!')
      return
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log('已連接帳戶:', account)
      setCurrentAccount(account)
      onAccountChange(account)
    } else {
      console.log('尚未連接錢包')
    }
  }, [onAccountChange])

  // 連接錢包
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('請安裝 MetaMask!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('已連接帳戶:', accounts[0])
      setCurrentAccount(accounts[0])
      onAccountChange(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  // 斷開連接錢包
  const disconnectWallet = () => {
    setCurrentAccount(null)
    onAccountChange(null)
  }

  useEffect(() => {
    checkIfWalletIsConnected()

    // 監聽帳戶變更
    const { ethereum } = window
    if (ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0])
          onAccountChange(accounts[0])
        } else {
          setCurrentAccount(null)
          onAccountChange(null)
        }
      }

      ethereum.on('accountsChanged', handleAccountsChanged)

      // 清理事件監聽器
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
  }, [checkIfWalletIsConnected, onAccountChange])

  return (
    <div>
      {currentAccount ? (
        <div className="flex items-center justify-between">
          <p className="text-green-500">已連接帳戶: {currentAccount}</p>
          <button
            onClick={disconnectWallet}
            className="w-auto ml-4 rounded-md bg-red-500 text-white p-2 hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-24 rounded-md bg-[#262626] text-[#FFF] p-2 hover:bg-gray-700 transition-colors"
        >
          Connect
        </button>
      )}
    </div>
  )
}

export default ConnectWallet
