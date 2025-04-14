import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Message {
    id: ID!
    text: String!
    userId: String!
    createdAt: String!
    quotedMessageId: String
    mentionedUserIds: [String]
  }

  type Query {
    messages: [Message]!
  }

  type Mutation {
    sendMessage(text: String!, userId: String!, quotedMessageId: String, mentionedUserIds: [String]): Message!
  }
`;

export default typeDefs;
