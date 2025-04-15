import React, { useState } from 'react';
import socket from '../sockets/socketClient';
import { useMutation, gql } from '@apollo/client';

import './MessageInput.css';  // Import MessageInput styles



const SEND_MESSAGE = gql`
  mutation SendMessage(
    $text: String!, 
    $userId: String!, 
    $quotedMessageId: String, 
    $mentionedUserIds: [String]
  ) {
    sendMessage(
      text: $text, 
      userId: $userId, 
      quotedMessageId: $quotedMessageId, 
      mentionedUserIds: $mentionedUserIds
    ) {
      id
      text
      userId
      createdAt
    }
  }
`;


interface MessageInputProps {
  userId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ userId }) => {
  const [text, setText] = useState('');
  const [sendMessageMutation, { loading, error }] = useMutation(SEND_MESSAGE);


  const sendMessage = async () => {
    if (text.trim()) {
      const messageData = { text, userId, createdAt: new Date().toISOString() };
      socket.emit('sendMessage', messageData);
      setText('');

      await saveMessage();
    }
  };

  const saveMessage = async () => {
    if (text.trim()) {
      try {
        await sendMessageMutation({
          variables: {
            text,
            userId,
            quotedMessageId: null,         // Pass null if not used
            mentionedUserIds: []           // Pass an empty array if no users are mentioned
          }
        });
        setText('');
      } catch (err) {
        console.error('Error sending message via GraphQL mutation:', err);
      }
    }
  };


  return (
    <div className="message-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
