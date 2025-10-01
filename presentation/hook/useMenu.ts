import create from 'zustand'

interface useMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const useMenu = create<useMenuProps>(set => {
  return {
    open: true,
    setOpen: open => set({ open })
  }
})

export { useMenu }