import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getShortLink } from "@/lib/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  longUrl: z.string().url("Please enter a valid URL"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onLinkCreated: (shortLink: string) => void;
};
export default function CreateLinkForm({ onLinkCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    const { longUrl } = data;
    getShortLink(longUrl)
      .then((res) => {
        onLinkCreated(res.shortUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="longUrl">Long URL</Label>
        <Input
          id="longUrl"
          placeholder="https://your-long-url-here.com"
          {...register("longUrl")}
        />
        {errors.longUrl && (
          <p
            className="mt-2 text-xs text-destructive"
            role="alert"
            aria-live="polite"
          >
            {errors.longUrl.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full">
        Shorten URL ✨
      </Button>
    </form>
  );
}
