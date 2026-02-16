import { create } from "zustand";

//
// 🫧 Bubble Store (user-controlled, keep as-is)
//
interface BubbleState {
  isPlaying: boolean;
  togglePlay: () => void;
  setPlaying: (value: boolean) => void;
}

export const useBubbleStore = create<BubbleState>((set) => ({
  isPlaying: false,

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  // useful for animation orchestration
  setPlaying: (value) =>
    set({
      isPlaying: value,
    }),
}));

//
// 🍔 Menu Store (keep as-is)
//
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

//
// 🎬 Animation Orchestration Store (NEW)
// Controls intro timeline and shared animation flags
//
interface AnimationState {
  // master intro lifecycle
  introStarted: boolean;
  introCompleted: boolean;

  // individual animation flags
  textReady: boolean;
  canReady: boolean;
  headerReady: boolean;
  bubblesReady: boolean;

  // actions
  startIntro: () => void;
  completeIntro: () => void;

  setTextReady: (value: boolean) => void;
  setCanReady: (value: boolean) => void;
  setHeaderReady: (value: boolean) => void;
  setBubblesReady: (value: boolean) => void;

  resetIntro: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  introStarted: false,
  introCompleted: false,

  textReady: false,
  canReady: false,
  headerReady: false,
  bubblesReady: false,

  startIntro: () =>
    set({
      introStarted: true,
    }),

  completeIntro: () => {

    set({
      introCompleted: true,
      textReady: true,
      canReady: true,
      headerReady: true,
      bubblesReady: true,
    })
    sessionStorage.setItem("introPlayed", "true");
  },

  setTextReady: (value) =>
    set({
      textReady: value,
    }),

  setCanReady: (value) =>
    set({
      canReady: value,
    }),

  setHeaderReady: (value) =>
    set({
      headerReady: value,
    }),

  setBubblesReady: (value) =>
    set({
      bubblesReady: value,
    }),

  resetIntro: () =>
    set({
      introStarted: false,
      introCompleted: false,
      textReady: false,
      canReady: false,
      headerReady: false,
      bubblesReady: false,
    }),
}));



// Store for mesh readiness
interface MeshState {
  ready: boolean;
  isReady: () => void;
}

export const useMeshStore = create<MeshState>((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
}));
