"use client";

import { useSubmitNote } from "@/hooks/use-submit-note";
import CustomInput from "../custom/custom-input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Form } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import CustomTextarea from "../custom/custom-textarea";
import NoteSubmittedDialog from "./note-submitted-dialog";

const NotesSubmitForm = () => {
  const { form, submitNote, isPending, isOpen, closeDialog, trackingCode } =
    useSubmitNote();

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>إرسال ملاحظة جديدة</CardTitle>
          <CardDescription>
            الرجاء إدخال بياناتك وملاحظتك، وسيتم إعطاؤك كود تتبع لمتابعة الحالة.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitNote)}
              className="flex flex-col gap-6"
            >
              <CustomInput
                name="full_name"
                label="الاسم الكامل"
                placeholder="أدخل اسمك الكامل"
              />

              <CustomInput
                type="tel"
                name="phone"
                label="رقم الجوال"
                placeholder="05XXXXXXXX"
              />

              <CustomInput
                name="email"
                label="البريد الإلكتروني"
                placeholder="name@example.com"
              />

              <CustomInput
                name="title"
                label="عنوان الملاحظة"
                placeholder="أدخل عنوانًا قصيرًا"
              />

              <CustomTextarea
                name="content"
                label="نص الملاحظة"
                placeholder="اكتب ملاحظتك هنا (50 حرفًا على الأقل)"
                rows={5}
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  checked
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="terms">أوافق على الشروط والأحكام</Label>
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                إرسال الملاحظة
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <NoteSubmittedDialog
        isOpen={isOpen}
        trackingCode={trackingCode}
        closeDialog={closeDialog}
      />
    </>
  );
};

export default NotesSubmitForm;
