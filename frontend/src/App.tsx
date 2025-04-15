import React, { useState } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import Sidebar from './components/Sidebar';
import Top from './components/Top';
import './App.css';

const App: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<string>('');
    const userId = 'Scott';

    // Example data for channels and user list
    const channels = ["Forum", "Chat", "Matches"];
    const users = ["Elon", "Donald", "Jeff"];

    return (
        <div className="app-container">
            <Top />
            <Sidebar channels={channels} users={users}
                selectedUser={selectedUser}
                onUserSelect={(user) => setSelectedUser(user)}

            />
            <div className="main-content">
                {/* <h1>Chat App</h1> */}
                <div className="chatWindow">
                    <MessageList selectedUser={selectedUser} />
                </div>
                <MessageInput userId={userId} selectedUser={selectedUser} />
            </div>
        </div>
    );
};

export default App;
