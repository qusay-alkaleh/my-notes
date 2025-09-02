"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { showToast } from "@/lib/toast";
import {
  getNoteByTrackCode,
  getNoteStepsByNoteId,
} from "@/services/note.service";
import UserSummary from "./user-summary";
import AuthForm from "./auth-from";
import NoteStepCard from "./note-step-card";

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [trackCode, setTrackCode] = useState("");

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<NoteDomain | null>(null);
  const [noteSteps, setNoteSteps] = useState<NoteStepDomain[]>([]);

  const fetchNote = async () => {
    if (trackCode.length != 5)
      return showToast("كود التتبع يجب أن يكون مكون من 5 أرقام", "warning");

    setisLoading(true);
    const { success, data: note, error } = await getNoteByTrackCode(trackCode);

    if (!success && error) {
      setisLoading(false);
      return showToast(error, "error");
    }

    const noteStep = await getNoteStepsByNoteId(note.id);
    if (!noteStep) {
      setisLoading(false);
      return showToast(
        "حدث خطا أثناء جلب بيانات المراحل. يرجى المحاولة مرأخرى",
        "error"
      );
    }

    setisLoading(false);
    setNoteSteps(noteStep);
    setNoteData(note);
  };

  if (!authenticated) {
    return <AuthForm setAuthenticated={setAuthenticated} />;
  }

  return (
    <>
      <div className="flex gap-2 mx-auto max-w-3xl">
        <Input
          type="number"
          value={trackCode}
          placeholder="أدخل كود التتبع (5 أرقام) "
          onChange={(e) => setTrackCode(e.target.value)}
        />
        <Button onClick={fetchNote} disabled={isLoading}>
          {isLoading ? "جاري التحميل..." : "ابحث"}
        </Button>
      </div>

      {noteData && (
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-6">
          <UserSummary {...noteData} />
          <NoteStepCard
            noteData={noteData}
            setNoteData={setNoteData}
            noteSteps={noteSteps}
            setNoteSteps={setNoteSteps}
          />
        </div>
      )}
    </>
  );
};

export default AdminPanel;
