"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Prevents hydration mismatch and layout timing issues
 * Works safely with Next.js App Router and SSR
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
