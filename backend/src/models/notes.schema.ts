import { InferSchemaType, Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
  },
  { timestamps: true },
);

type NoteSchemeType = InferSchemaType<typeof noteSchema>;

export default model<NoteSchemeType>('Note', noteSchema);
