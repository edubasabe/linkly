import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLinks } from "@/hooks/useLinks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onLinkCreated: (shortLink: string) => void;
};
export default function CreateLinkForm({ onLinkCreated }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    create: { mutate },
  } = useLinks({
    create: {
      onSuccess: (data) => {
        onLinkCreated(data.shortUrl);
        formRef.current?.reset();
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    const { url } = data;
    mutate(url);
  };

  return (
    <form ref={formRef} className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="url">Long URL</Label>
        <Input
          id="url"
          placeholder="https://your-long-url-here.com"
          {...register("url")}
        />
        {errors.url && (
          <p
            className="mt-2 text-xs text-destructive"
            role="alert"
            aria-live="polite"
          >
            {errors.url.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full">
        Shorten URL ✨
      </Button>
    </form>
  );
}
