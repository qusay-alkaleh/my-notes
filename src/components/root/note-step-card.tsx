import { Currency, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DEFAULT_NOTE_TITLES } from "@/constants/note";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { updatedNoteWithSteps } from "@/services/note.service";
import { showToast } from "@/lib/toast";
import { useState } from "react";

interface Props {
  noteData: NoteDomain;
  setNoteData: React.Dispatch<React.SetStateAction<NoteDomain | null>>;
  noteSteps: NoteStepDomain[];
  setNoteSteps: React.Dispatch<React.SetStateAction<NoteStepDomain[]>>;
}

const NoteStepCard: React.FC<Props> = ({
  noteData,
  setNoteData,
  noteSteps,
  setNoteSteps,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStepNote = (index: number, newNote: string) => {
    setNoteSteps((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        step_note: newNote,
      };
      return updated;
    });
  };

  const saveChanges = async () => {
    setIsUpdating(true);

    const isUpdated = await updatedNoteWithSteps(noteData, noteSteps);

    if (!isUpdated) showToast("حدث خطا أثناء حفظ التعديلات", "error");
    else showToast("تم حفظ التعديلات بنجاح", "success");

    setIsUpdating(false);
  };

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Currency className="text-blue-600" />
            الحالة الحالية
          </div>
          <Select
            value={noteData.current_step.toString()}
            onValueChange={(val) =>
              setNoteData({ ...noteData, current_step: Number(val) })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر حالة الملاحظة" />
            </SelectTrigger>
            <SelectContent>
              {DEFAULT_NOTE_TITLES.map((step, index) => (
                <SelectItem key={index} value={(index + 1).toString()}>
                  {index + 1} - {step}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-start gap-4"></div>

        <div className="space-y-4">
          {noteSteps.map((step, index) => (
            <div key={index}>
              <label className="block mb-1">
                ملاحظة للخطوة{" "}
                <span className="text-md text-red-600 font-semibold">
                  {`"${DEFAULT_NOTE_TITLES[index]}"`}
                </span>
              </label>
              <Textarea
                value={step.step_note}
                onChange={(e) => updateStepNote(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mr-auto">
        <Button onClick={saveChanges} disabled={isUpdating}>
          <Save className="ml-1" />
          {isUpdating ? "جاري التحديث..." : "حفظ التعديلات"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteStepCard;
