import { getAllLinks, Link } from "@/api/link";
import { useQuery } from "@tanstack/react-query";
import { useCreateLink } from "@/hooks/mutations/useCreateLink";
import { useUpdateLink } from "@/hooks/mutations/useUpdateLink";
import { useDeleteLink } from "@/hooks/mutations/useDeleteLink";

export function useLinks({
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
}: {
  onCreateSuccess?: (data: Link) => void;
  onUpdateSuccess?: (data: Link) => void;
  onDeleteSuccess?: () => void;
} = {}) {
  const getAll = useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });

  return {
    create: useCreateLink(onCreateSuccess),
    update: useUpdateLink(onUpdateSuccess),
    delete: useDeleteLink(onDeleteSuccess),
    getAll,
  };
}
