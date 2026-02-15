import { create } from "zustand";



// Store for bubble animation control
interface BubbleState {
  isPlaying: boolean;
  togglePlay: () => void;
}

export const useBubbleStore = create<BubbleState>((set) => ({
  isPlaying: false, // Default to playing
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));



interface MenuState {
  isMenuOpen: boolean;
  isAnimating: boolean;

  openMenu: () => void;
  closeMenu: () => void;
  setAnimating: (value: boolean) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  isMenuOpen: false,
  isAnimating: false,

  openMenu: () =>
    set({
      isMenuOpen: true,
    }),

  closeMenu: () =>
    set({
      isMenuOpen: false,
    }),

  setAnimating: (value) =>
    set({
      isAnimating: value,
    }),
}));




