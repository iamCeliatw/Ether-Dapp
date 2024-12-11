import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface AppState {
  userAddress: string | null
  chainId: number | null
  isWalletConnected: boolean
  setUserAddress: (userAddress: string) => void
  setChainId: (chainId: number) => void
  setIsWalletConnected: (isWalletConnected: boolean) => void
  initializeChain: () => Promise<void>
}

const customStorage = {
  getItem: (name: string) => {
    const value = sessionStorage.getItem(name)
    return value ? JSON.parse(value) : null // 確保返回解析後的對象或 null
  },
  setItem: (name: string, value: string) => {
    sessionStorage.setItem(name, JSON.stringify(value)) // 確保存儲為 JSON 字符串
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name)
  },
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userAddress: 'test',
      chainId: null,
      isWalletConnected: false,

      setUserAddress: (userAddress: string) => set({ userAddress }),
      setChainId: (chainId: number) => set({ chainId }),
      setIsWalletConnected: (isWalletConnected: boolean) =>
        set({ isWalletConnected }),
      initializeChain: async () => {
        // Initialize the chain
      },
    }),
    {
      name: 'session-storage',
      storage: customStorage,
    } as PersistOptions<AppState>
  )
)
export default useAppStore
