export interface NoteType {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteIdCollapsed {
  _id: string;
  collapsed: boolean;
}

export interface NoteIdActivedOptions {
  _id: string;
  activedOptions: boolean;
}

export interface NoteIsEdited {
  isEdited: boolean;
  note: NoteType | null;
}

export interface NoteIsDeleted {
  isDeleted: boolean;
  note: NoteType | null;
}

export interface UserType {
  username: string;
  email: string;
}
