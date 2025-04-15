import React, { useEffect, useState } from 'react';
import socket from '../sockets/socketClient';
import { useQuery, gql } from '@apollo/client';
import './MessageList.css';  // Import MessageList styles

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      text
      userId
      to
      createdAt
    }
  }
`;

interface Message {
  id: string;
  text: string;
  userId: string;
  to: string;
  createdAt: string;
}


interface MessageListProps {
  selectedUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ selectedUser }) => {
  const { data, loading, error } = useQuery(GET_MESSAGES);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (data) setMessages(data.messages);

  }, [data]);

  useEffect(() => {
    socket.on('newMessage', (message: Message) => {
      console.log('New message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages</p>;

  const filteredMessages = messages.filter((msg) => msg.userId === selectedUser || msg.to === selectedUser);


  return (
    <ul className="message-list">
      {filteredMessages.map((msg) => (
        <li
          key={msg.id}
          // Conditionally add "highlight" class if the message's userId equals "User123"
          className={`message-item ${msg.userId === "Scott" ? 'highlight' : ''}`}
        >
          <div className='message-content'>
            <strong>{msg.userId}:</strong>
            <br />
            {msg.text}{' '}
            <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
          </div>

        </li>
      ))}
    </ul>
  );
};

export default MessageList;
