import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CircleX, CloudUpload, LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLinks } from "@/hooks/useLinks";
import { Link } from "@/api/link";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  link: Link;
  formId: string;
  onSuccess: () => void;
  onCancel: () => void;
};
export default function FormEditLink({
  link,
  formId,
  onSuccess,
  onCancel,
}: Props) {
  const {
    update: { mutate, isPending },
  } = useLinks({
    update: {
      onSuccess,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: link.original,
    },
  });

  const onSubmit = (data: FormValues) => {
    const { url } = data;
    mutate({ id: link.id, original: url });
  };

  return (
    <form
      id={formId}
      className="flex gap-x-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input placeholder="Enter a Link" type="url" {...register("url")} />
      {errors.url && (
        <p
          className="mt-2 text-xs text-destructive"
          role="alert"
          aria-live="polite"
        >
          {errors.url.message}
        </p>
      )}
      <div className="flex gap-x-2">
        <Button
          type="submit"
          variant={"outline"}
          disabled={isPending || !isDirty}
          className="flex gap-x-2"
        >
          {isPending ? (
            <>
              {"Saving..."}
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              {"Save"}
              <CloudUpload size={16} strokeWidth={2} aria-hidden="true" />
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="flex gap-x-2 text-destructive hover:text-destructive "
          title="Cancel edit"
          onClick={onCancel}
        >
          Discard
          <CircleX className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
