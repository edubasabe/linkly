import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

type Props = {
  label?: string;
  value: string;
};
export default function ReadOnlyInput({ label, value }: Props) {
  const id = useId();
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        className="read-only:bg-muted"
        defaultValue={value}
        type="text"
        readOnly
      />
    </div>
  );
}
