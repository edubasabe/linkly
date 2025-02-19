import { deleteLink, Link } from "@/api/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLink(onDeleteSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-link"],
    mutationFn: (deletedLink: Partial<Link>) => deleteLink(deletedLink.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      onDeleteSuccess?.();
    },
  });
}
