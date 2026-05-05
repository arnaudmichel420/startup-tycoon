import { setTokenProvider } from "@/lib/api";
import { useAuth } from "@clerk/react";
import { useEffect } from "react";

export function ApiAuthProvider() {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenProvider(getToken);

    return () => {
      setTokenProvider(null);
    };
  }, [getToken]);

  return null;
}
