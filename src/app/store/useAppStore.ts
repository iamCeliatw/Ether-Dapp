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
// 定義 StorageValue 類型
type StorageValue<T> = {
  state: T
  version: number // Persist 的版本號
}
const customStorage = {
  getItem: (name: string): StorageValue<AppState> | null => {
    const value = sessionStorage.getItem(name)
    return value ? JSON.parse(value) : null
  },
  setItem: (name: string, value: StorageValue<AppState>): void => {
    sessionStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name: string): void => {
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
