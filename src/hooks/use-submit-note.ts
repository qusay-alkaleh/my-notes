import { showToast } from "@/lib/toast";
import { SubmitNoteSchema } from "@/schemas/submit-note-schema";
import { createNoteWithSteps } from "@/services/note.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useSubmitNote = () => {
  const [isPending, startTransition] = useTransition();
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SubmitNoteSchema>>({
    resolver: zodResolver(SubmitNoteSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      title: "",
      content: "",
    },
  });

  const closeDialog = () => {
    form.reset();
    setisOpen(false);
  };

  const submitNote = (data: z.infer<typeof SubmitNoteSchema>) => {
    startTransition(async () => {
      const res = await createNoteWithSteps(data);

      if (!res)
        return showToast(
          "حدث خطأ أثناء إرسال الملاحظة. الرجاء المحاولة لاحقًا.",
          "error"
        );

      setTrackingCode(res.public_id.toString());
      setisOpen(true);
    });
  };

  return { form, submitNote, isPending, trackingCode, isOpen, closeDialog };
};
