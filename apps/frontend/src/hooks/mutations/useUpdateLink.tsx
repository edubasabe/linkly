import { updateLink, Link } from "@/api/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateLink(onSuccess?: (data: Link) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-link"],
    mutationFn: (updatedLink: Partial<Link>) => updateLink(updatedLink.id!, updatedLink),
    onSuccess: (data) => {
      queryClient.setQueryData(["links"], (oldData: Link[] = []) => 
        oldData.map((item) => (item.id === data.id ? data : item))
      );
      onSuccess?.(data);
    },
  });
}