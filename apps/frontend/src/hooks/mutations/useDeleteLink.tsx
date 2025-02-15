import { deleteLink, Link } from "@/api/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLink(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-link"],
    mutationFn: (deletedLink: Partial<Link>) => deleteLink(deletedLink.id!),
    onSuccess: (_, deletedLink) => {
      queryClient.setQueryData(["links"], (oldData: Link[] = []) => 
        oldData.filter((item) => item.id !== deletedLink.id)
      );
      onSuccess?.();
    },
  });
}