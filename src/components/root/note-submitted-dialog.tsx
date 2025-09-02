import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { FiCopy } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";

interface Props {
  isOpen: boolean;
  trackingCode: string;
  closeDialog: () => void;
}

const NoteSubmittedDialog: React.FC<Props> = ({
  isOpen,
  trackingCode,
  closeDialog,
}) => {
  const copyTrackingCode = async () => {
    try {
      await navigator.clipboard.writeText(trackingCode);
      showToast("تم نسخ كود التتبع بنجاح!", "success");
    } catch {
      showToast("تعذر نسخ الكود، حاول يدويًا.", "error");
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        <DialogHeader className="flex flex-col justify-start items-start">
          <DialogTitle>تم إرسال ملاحظتك</DialogTitle>
          <DialogDescription>
            تم حفظ ملاحظتك بنجاح. استخدم كود التتبع أدناه لمتابعة حالتها.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Input value={trackingCode} readOnly className="font-mono" />
          <Button type="button" onClick={copyTrackingCode} variant="outline">
            <FiCopy className="h-4 w-4" />
          </Button>
        </div>

        <DialogFooter className="mt-4 flex items-start gap-2">
          <Link
            href="/track"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            اذهب إلى صفحة التتبع
          </Link>
          <Button variant="outline" onClick={closeDialog}>
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteSubmittedDialog;
