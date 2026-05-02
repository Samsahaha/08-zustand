import type { AxiosResponse } from "axios";
import { ensureToken, notesClient } from "@/lib/api/client";
import type {
  CreateNotePayload,
  FetchNotesParams,
  FetchNotesResponse,
  Note,
  NoteTag,
} from "@/types/note";

export async function fetchNotesPage(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  ensureToken();

  const query: {
    page: number;
    perPage: number;
    search?: string;
    tag?: NoteTag;
  } = {
    page: params.page,
    perPage: params.perPage,
  };

  if (params.search.trim()) {
    query.search = params.search.trim();
  }

  if (params.tag) {
    query.tag = params.tag;
  }

  const response: AxiosResponse<FetchNotesResponse> = await notesClient.get(
    "/notes",
    { params: query },
  );

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  ensureToken();

  const response: AxiosResponse<Note> = await notesClient.get(
    `/notes/${noteId}`,
  );
  return response.data;
}

export async function createNoteRequest(
  payload: CreateNotePayload,
): Promise<Note> {
  ensureToken();

  const response: AxiosResponse<Note> = await notesClient.post(
    "/notes",
    payload,
  );
  return response.data;
}

export async function deleteNoteRequest(noteId: string): Promise<void> {
  ensureToken();

  await notesClient.delete(`/notes/${noteId}`);
}
