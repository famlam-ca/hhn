import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useRefresh = (interval = 30000) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const timeout = interval / 10;

  const refresh = useCallback(() => {
    setIsDisabled(true);
    router.refresh();
    setTimeout(() => setIsDisabled(false), timeout);
  }, [router, timeout]);

  useEffect(() => {
    const id = setInterval(refresh, interval);
    return () => clearInterval(id);
  }, [interval, refresh]);

  return { isDisabled, refresh };
};
