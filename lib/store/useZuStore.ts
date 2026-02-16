import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ================= SESSION STORAGE ADAPTER ================= */
const sessionStorageAdapter = {
  getItem: (name: string) => Promise.resolve(sessionStorage.getItem(name)),
  setItem: (name: string, value: string) =>
    Promise.resolve(sessionStorage.setItem(name, value)),
  removeItem: (name: string) => Promise.resolve(sessionStorage.removeItem(name)),
};

/* ================= 🫧 Bubble Store ================= */
interface BubbleState {
  isPlaying: boolean;
  togglePlay: () => void;
  setPlaying: (value: boolean) => void;
}

export const useBubbleStore = create<BubbleState>()(
  persist(
    (set) => ({
      isPlaying: false,
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setPlaying: (value: boolean) => set({ isPlaying: value }),
    }),
    {
      name: "bubble-storage",
      storage: sessionStorageAdapter,
    }
  )
);

/* ================= 🍔 Menu Store ================= */
interface MenuState {
  isMenuOpen: boolean;
  isAnimating: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  setAnimating: (value: boolean) => void;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      isAnimating: false,
      openMenu: () => set({ isMenuOpen: true }),
      closeMenu: () => set({ isMenuOpen: false }),
      setAnimating: (value: boolean) => set({ isAnimating: value }),
    }),
    {
      name: "menu-storage",
      storage: sessionStorageAdapter,
    }
  )
);

/* ================= 🎬 Animation Store ================= */
interface AnimationState {
  introStarted: boolean;
  introCompleted: boolean;
  textReady: boolean;
  canReady: boolean;
  headerReady: boolean;
  bubblesReady: boolean;

  startIntro: () => void;
  completeIntro: () => void;
  setTextReady: (value: boolean) => void;
  setCanReady: (value: boolean) => void;
  setHeaderReady: (value: boolean) => void;
  setBubblesReady: (value: boolean) => void;
  resetIntro: () => void;
}

export const useAnimationStore = create<AnimationState>()(
  persist(
    (set) => ({
      introStarted: false,
      introCompleted: false,
      textReady: false,
      canReady: false,
      headerReady: false,
      bubblesReady: false,

      startIntro: () => set({ introStarted: true }),

      completeIntro: () =>
        set({
          introCompleted: true,
          textReady: true,
          canReady: true,
          headerReady: true,
          bubblesReady: true,
        }),

      setTextReady: (value: boolean) => set({ textReady: value }),
      setCanReady: (value: boolean) => set({ canReady: value }),
      setHeaderReady: (value: boolean) => set({ headerReady: value }),
      setBubblesReady: (value: boolean) => set({ bubblesReady: value }),

      resetIntro: () =>
        set({
          introStarted: false,
          introCompleted: false,
          textReady: false,
          canReady: false,
          headerReady: false,
          bubblesReady: false,
        }),
    }),
    {
      name: "animation-storage",
      storage: sessionStorageAdapter,
    }
  )
);

/* ================= 🏗️ Mesh Store ================= */
interface MeshState {
  ready: boolean;
  isReady: () => void;
}

export const useMeshStore = create<MeshState>()(
  persist(
    (set) => ({
      ready: false,
      isReady: () => set({ ready: true }),
    }),
    {
      name: "mesh-storage",
      storage: sessionStorageAdapter,
    }
  )
);
