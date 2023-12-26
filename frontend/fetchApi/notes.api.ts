import { NoteType } from '@/types';

const fetchData = async (url: RequestInfo, method: RequestInit) => {
  const response = await fetch(url, method);
  if (response.ok) {
    return response;
  } else {
    const errBody = await response.json();
    const errMsg = errBody.error;
    throw Error(
      'Request failed with status: ' + response.status + ' message: ' + errMsg
    );
  }
};

export const fetchNotes = async (): Promise<NoteType[]> => {
  const response = await fetchData('http://localhost:5000/api/notes', {
    method: 'GET',
  });
  return response.json();
};

export interface NoteInput {
  title: string;
  content?: string;
}

export const createNote = async (note: NoteInput): Promise<NoteType> => {
  const response = await fetchData('http://localhost:5000/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const deleteNote = async (noteId: string) => {
  await fetchData(`http://localhost:5000/api/notes/query?noteId=${noteId}`, {
    method: 'DELETE',
  });
};

export const updateNote = async (
  noteId: string,
  updateNote: NoteType
): Promise<NoteType> => {
  const response = await fetchData(
    `http://localhost:5000/api/notes/query?noteId=${noteId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateNote),
    }
  );
  return response.json();
};
