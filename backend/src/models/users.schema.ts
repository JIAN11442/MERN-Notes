import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true, select: true },
  password: { type: String, require: true, select: false },
});

type UserSchemaType = InferSchemaType<typeof userSchema>;

export default model<UserSchemaType>('User', userSchema);
