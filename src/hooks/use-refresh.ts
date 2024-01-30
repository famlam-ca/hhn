import { useRouter } from "next/navigation";
import { useState } from "react";

export const useRefresh = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const refresh = () => {
    setIsDisabled(true);
    router.refresh();
    setTimeout(() => setIsDisabled(false), 3000); // 3 sec = 3000
  };

  return { isDisabled, refresh };
};
