import {
  createLink,
  deleteLink,
  getAllLinks,
  Link,
  updateLink,
} from "@/api/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  create?: {
    onSuccess?: (data: Link) => void;
  };
  update?: {
    onSuccess?: (data: Link) => void;
  };
  remove?: {
    onSuccess?: () => void;
  };
};

export function useLinks({ create, update, remove }: Props = {}) {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });

  const createMutation = useMutation({
    mutationKey: ["create-link"],
    mutationFn: (url: string) => createLink(url),
    onSuccess: (data) => {
      queryClient.setQueryData(["links"], (oldData: Link[] = []) => {
        return [...oldData, data];
      });

      if (create?.onSuccess) {
        create.onSuccess(data);
      }
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["update-link"],
    mutationFn: (updatedLink: Partial<Link>) =>
      updateLink(updatedLink.id!, updatedLink),
    onSuccess: (data) => {
      queryClient.setQueryData(["links"], (oldData: Link[] = []) => {
        return oldData.map((item) => (item.id === data.id ? data : item));
      });

      if (update?.onSuccess) {
        update.onSuccess(data);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-link"],
    mutationFn: (deletedLink: Partial<Link>) => deleteLink(deletedLink.id!),
    onSuccess: (_, deletedLink) => {
      // Handle 204 response by using the original deletedLink data
      queryClient.setQueryData(["links"], (oldData: Link[] = []) => {
        return oldData.filter((item) => item.id !== deletedLink.id);
      });

      // Remove invalidateQueries since we're handling the cache update manually
      if (remove?.onSuccess) {
        remove.onSuccess();
      }
    },
    // Add onSettled to handle both success and error cases
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
    getAll,
  };
}
