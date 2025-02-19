import { TableCell } from "./ui/table";
import { Link } from "@/api/link";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useId, useState } from "react";
import FormEditLink from "./FormEditLink";
import ReadOnlyInput from "./ReadOnlyInput";
import TooltipWrapper from "./TooltipWrapper";
import ButtonCopy from "./ButtonCopy";
import ConfirmationModal from "./ConfirmationModal";
import { useLinks } from "@/hooks/useLinks";
import { useToast } from "@/hooks/use-toast";

export default function TableRowItem({ link }: { link: Link }) {
  const { toast } = useToast();
  const {
    delete: { mutate: deleteLink },
  } = useLinks({
    onDeleteSuccess: () => {
      toast({
        title: "Link deleted",
        description: "The link has been deleted successfully",
      });
    },
  });
  const [editMode, setEditMode] = useState(false);
  const formId = useId();

  return (
    <>
      <TableCell
        colSpan={editMode ? 3 : 1}
        className="font-medium truncate max-w-xs"
        title={link.original}
      >
        {editMode ? (
          <FormEditLink
            link={link}
            formId={formId}
            onSuccess={() => {
              setEditMode(false);
            }}
            onCancel={() => {
              setEditMode(false);
            }}
          />
        ) : (
          <ReadOnlyInput value={link.original} />
        )}
      </TableCell>
      {!editMode && (
        <TableCell>
          <TooltipWrapper label={link.shortUrl}>
            <p className="truncate w-full max-w-36">{link.shortUrl}</p>
          </TooltipWrapper>
        </TableCell>
      )}
      <TableCell>
        <div className="flex items-center gap-1">
          {!editMode && (
            <>
              <TooltipWrapper label="Edit original URL">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  title="Edit link"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  <Pencil className="h-4 w-4" size={16} />
                </Button>
              </TooltipWrapper>

              <ButtonCopy text={link.shortUrl} />

              <ConfirmationModal
                title={`Delete "${link.original}"?`}
                description="This will delete the link permanently"
                onConfirm={() => deleteLink(link)}
                className="h-9 w-9 [&_svg]:h-4 [&_svg]:w-4 hover:bg-accent hover:text-accent-foreground rounded-lg flex items-center justify-center"
              >
                <TooltipWrapper label="Delete link" asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    title="Delete link"
                  >
                    <Trash2 className="h-4 w-4" size={16} />
                  </Button>
                </TooltipWrapper>
              </ConfirmationModal>
            </>
          )}
        </div>
      </TableCell>
    </>
  );
}
