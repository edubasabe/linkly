import { createLink, Link } from "@/api/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLink(onSuccess?: (data: Link) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-link"],
    mutationFn: (url: string) => createLink(url),
    onSuccess: (data) => {
      queryClient.setQueryData(["links"], (oldData: Link[] = []) => [...oldData, data]);
      onSuccess?.(data);
    },
  });
}