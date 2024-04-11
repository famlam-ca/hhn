import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

import { toast } from "@/components/ui/use-toast";
import { createUserToken } from "@/lib/services/token-service";

export const useUserToken = (ownerIdentity: string) => {
  const [token, setToken] = useState<string>("");
  const [identity, setIdentity] = useState<string>("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createUserToken(ownerIdentity);
        setToken(viewerToken);

        const decoded = jwt.decode(viewerToken)!;
        const identity = (decoded as { identity: string }).identity;

        if (identity) {
          setIdentity(identity);
        }
      } catch (error) {
        toast({ title: "Something went wrong" });
      }
    };

    createToken();
  });

  return {
    token,
    identity,
  };
};
