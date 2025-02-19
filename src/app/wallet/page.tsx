// app/page.tsx
'use client'
import React from 'react'
import ConnectWallet from '../components/wallect/ConnectWallet'
import WalletBalance from '../components/wallect/WalletBalance'

const WalletPage: React.FC = () => {
  const [account, setAccount] = React.useState<string | null>(null)

  const handleAccountChange = (newAccount: string | null) => {
    setAccount(newAccount)
  }

  return (
    <div className="p-5">
      <ConnectWallet onAccountChange={handleAccountChange} />
      {account && <WalletBalance account={account || ''} />}
    </div>
  )
}

export default WalletPage
