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
