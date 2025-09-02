"use server";

import { DEFAULT_NOTE_CONTENTS } from "@/constants/note";
import { supabaseAdmin } from "@/lib/supabase-client";

export const getNoteStepsByNoteId = async (
  note_id: number
): Promise<NoteStepDomain[] | null> => {
  const { data: noteSteps, error: noteStepsError } = await supabaseAdmin
    .from("note_steps")
    .select("*")
    .eq("note_id", note_id)
    .order("step_number", { ascending: true });

  if (noteStepsError) {
    console.log("error in fetching note steps => ", noteStepsError);
    return null;
  }

  return noteSteps;
};

const RESPONSE_MESSAGES: Record<number, string> = {
  406: "لا يوجد معلومات لهذا الكود",
  500: "حدث خطا في الخادم. يرجى المحاولة مرة أخرى",
};
export const getNoteByTrackCode = async (
  trackCode: string
): Promise<{ success: boolean; data: NoteDomain; error?: string }> => {
  const { data: note, status } = await supabaseAdmin
    .from("notes")
    .select("*")
    .eq("public_id", trackCode)
    .single();

  if (status != 200) {
    return {
      data: {} as NoteDomain,
      success: false,
      error: RESPONSE_MESSAGES[status],
    };
  }

  return {
    success: true,
    data: note,
  };
};

export const createNoteWithSteps = async (noteData: NoteDTO) => {
  const { full_name, phone, email, title, content } = noteData;

  const { data: note, error: noteError } = await supabaseAdmin
    .from("notes")
    .insert({
      public_id: Math.floor(10000 + Math.random() * 90000),
      full_name,
      phone,
      email,
      title,
      content,
      current_step: 1,
    })
    .select()
    .single();

  if (noteError) {
    console.log("error in inserting note => ", noteError);
    return null;
  }

  const note_id = note.id;

  const noteSteps = DEFAULT_NOTE_CONTENTS.map((step, index) => ({
    note_id,
    step_number: index + 1,
    step_note: step,
  }));

  const { error: stepsError } = await supabaseAdmin
    .from("note_steps")
    .insert(noteSteps);

  if (stepsError) {
    console.log("error in inserting note steps => ", stepsError);
    return null;
  }

  return note;
};

export const prepareStepsForNote = async (noteSteps: NoteStepDomain[]) => {
  const stepUpdatePromises = noteSteps.map(({ id, step_note }) =>
    supabaseAdmin.from("note_steps").update({ step_note }).eq("id", id)
  );

  const stepResults = await Promise.allSettled(stepUpdatePromises);

  const failedSteps = stepResults
    .map((result, index) => ({ result, step: noteSteps[index] }))
    .filter(({ result }) => result.status === "rejected" || result.value.error);

  if (failedSteps.length > 0) {
    console.error("Some note steps failed to update:");
    failedSteps.forEach(({ result, step }) => {
      console.error(`Step ID ${step.id}:`, result);
    });

    return null;
  }

  return noteSteps;
};

export const updatedNoteWithSteps = async (
  noteData: NoteDomain,
  noteSteps: NoteStepDomain[]
) => {
  const { id: noteId, current_step } = noteData;

  // Update the main note
  const { error: noteError } = await supabaseAdmin
    .from("notes")
    .update({ current_step })
    .eq("id", noteId)
    .select()
    .single();

  if (noteError) {
    console.error("Failed to update note:", noteError.message);
    return { success: false, error: "Failed to update main note." };
  }

  // Prepare step update promises
  const updatednoteSteps = await prepareStepsForNote(noteSteps);
  if (!updatednoteSteps) return;

  return true;
};
