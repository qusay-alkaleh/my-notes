"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showToast } from "@/lib/toast";
import {
  getNoteByTrackCode,
  getNoteStepsByNoteId,
} from "@/services/note.service";
import { DEFAULT_NOTE_TITLES } from "@/constants/note";
import { cn } from "@/lib/utils";
import UserSummary from "@/components/root/user-summary";
import { Eye, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function TrackPage() {
  const [code, setCode] = useState("");
  const [note, setNote] = useState<NoteDomain | null>(null);
  const [loading, setLoading] = useState(false);
  const [noteSteps, setNoteSteps] = useState<NoteStepDomain[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleTrack = async () => {
    if (code.length !== 5)
      return showToast("كود التتبع يجب أن يكون من 5 أرقام", "error");

    setLoading(true);

    const { data: note, success, error } = await getNoteByTrackCode(code);

    if (!success && error) {
      setLoading(false);
      showToast(error, "error");
      return;
    }
    setNote(note);

    const noteStep = await getNoteStepsByNoteId(note.id);
    if (!noteStep) {
      setLoading(false);
      showToast(
        "حدث خطا أثناء جلب بيانات المراحل. يرجى المحاولة مرأخرى",
        "error"
      );
      return;
    }

    setNoteSteps(noteStep);
    setLoading(false);
  };

  return (
    <section className="max-container p-6 min-h-[calc(100vh-8rem)]">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>تتبع حالة ملاحظتك</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex max-sm:flex-col gap-2 mb-6">
            <Input
              type="number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="أدخل كود التتبع (5 أرقام)"
              maxLength={5}
              className="tracking-widest"
            />
            <Button onClick={handleTrack} disabled={loading}>
              <Search className="size-5 ml-1" />
              {loading ? "جاري البحث..." : "تتبع الملاحظة"}
            </Button>
          </div>

          {note && (
            <div className="space-y-4">
              <div className="w-full">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setOpenDialog(!openDialog)}
                >
                  <Eye className="size-5 ml-1" />
                  اظهار ملخص الملاحظة
                </Button>

                {openDialog && (
                  <UserSummary className="w-full" {...(note as NoteDomain)} />
                )}
              </div>

              <div className="mt-6 space-y-4">
                {noteSteps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isActive = note.current_step >= stepNumber;
                  const isCurrent =
                    note.current_step === stepNumber && note.current_step !== 6;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex items-start gap-3 p-3 border rounded-lg",
                        isActive
                          ? "border-green-500 hover:bg-green-200 bg-green-50"
                          : "border-gray-200 hover:bg-gray-100",
                        isCurrent && "animate-pulse"
                      )}
                    >
                      <div
                        className={`h-6 w-6 flex items-center justify-center rounded-full text-white text-sm ${
                          isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      >
                        {stepNumber}
                      </div>
                      <div>
                        <p
                          className={`${
                            isActive ? "font-semibold text-green-700" : ""
                          }`}
                        >
                          {DEFAULT_NOTE_TITLES[index]}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {step.step_note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
