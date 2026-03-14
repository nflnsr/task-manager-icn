import { useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = (paramsName: string, value: string) => {
    const params = new URLSearchParams();

    if (value) {
      params.set(paramsName, value);
    } else {
      params.delete(paramsName);
    }

    router.replace(`?${params.toString()}`);
  };

  const getQueryString = (paramsName: string) => {
    return searchParams.get(paramsName)?.toString() || "";
  };

  return { set: createQueryString, get: getQueryString };
}
