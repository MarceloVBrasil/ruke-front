import create from 'zustand'

interface useLoadingProps {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const useLoading = create<useLoadingProps>(set => {
  return {
    loading: false,
    setLoading: loading => set({ loading })
  }
})

export { useLoading }