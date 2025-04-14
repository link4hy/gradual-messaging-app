import Message, { IMessage } from '../models/Message';

const resolvers = {
  Query: {
    messages: async (): Promise<IMessage[]> => {
      return await Message.find().sort({ createdAt: 1 });
    },
  },
  Mutation: {
    sendMessage: async (
      _: any,
      { text, userId, quotedMessageId, mentionedUserIds }: 
      { text: string; userId: string; quotedMessageId?: string; mentionedUserIds?: string[]; }
    ): Promise<IMessage> => {
      const newMessage = new Message({ text, userId, quotedMessageId, mentionedUserIds });
      await newMessage.save();
      // Optionally, you could emit a socket event for real-time update here.
      return newMessage;
    },
  },
};

export default resolvers;
