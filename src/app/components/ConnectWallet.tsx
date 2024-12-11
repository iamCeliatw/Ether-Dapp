'use client'
import React from 'react'
import useAppStore from '../store/useAppStore'

const ConnectWallet = () => {
  const { initializeChain, userAddress } = useAppStore()

  return (
    <div>
      <button onClick={initializeChain}>Connect Wallet</button>
      <h1> {userAddress} </h1>
    </div>
  )
}
export default ConnectWallet
