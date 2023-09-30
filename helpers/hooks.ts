import useSWR from "swr";

import { Member } from "@/app/api/members/route";

export function useMembers() {
  const { data, error, isLoading } = useSWR("/api/members", (url) =>
    fetch(url).then((res) => res.json())
  );

  return {
    members: data as Member[],
    isLoading,
    isError: error,
  };
}
