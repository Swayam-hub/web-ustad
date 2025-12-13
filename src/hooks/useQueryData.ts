import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isPending, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });
  return { data, isPending, refetch, isFetching };
};
