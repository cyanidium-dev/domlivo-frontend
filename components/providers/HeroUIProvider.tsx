'use client';

import { HeroUIProvider as HeroUIProviderBase } from '@heroui/react';

export function HeroUIProvider({ children }: { children: React.ReactNode }) {
  return <HeroUIProviderBase>{children}</HeroUIProviderBase>;
}
