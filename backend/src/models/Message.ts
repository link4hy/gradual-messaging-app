import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  text: string;
  userId: string;
  createdAt: Date;
  // Optional: quote reply, mention details etc.
  quotedMessageId?: string;
  mentionedUserIds?: string[];
}

const MessageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  quotedMessageId: { type: String, default: null },
  mentionedUserIds: { type: [String], default: [] },
});

export default model<IMessage>('Message', MessageSchema);
