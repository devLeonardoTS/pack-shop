import { PropsWithChildren, useEffect, useState } from "react";

export const HydrationZustand = ({ children }: PropsWithChildren) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <>{children}</> : null}</>;
};
