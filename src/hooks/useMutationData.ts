import {
  MutationFunction,
  MutationKey,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export const useMutationData = <
  TData extends MutationResponse = MutationResponse,
  TVariables = any
>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  queryKey?: string,
  onSuccess?: (data: TData) => void
): UseMutationResult<TData, unknown, TVariables> => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (onSuccess) onSuccess(data);
      toast(data.message || "Success");
    },
    onSettled: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    },
  });

  return mutation;
};
