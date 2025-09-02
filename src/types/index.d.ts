interface NoteDTO {
  full_name: string;
  phone: string;
  email: string;
  title: string;
  content: string;
}

interface NoteDomain extends NoteDTO {
  id: number;
  public_id: string;
  current_step: number;
  created_at: string;
  updated_at: string;
}

interface NoteStepDomain {
  id: number;
  created_at: string;
  note_id: number;
  step_number: number;
  step_note: string;
  updated_at: string;
}
