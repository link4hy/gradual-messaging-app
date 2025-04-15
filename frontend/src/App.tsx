import React from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import Sidebar from './components/Sidebar';
import Top from './components/Top';
import './App.css';

const App: React.FC = () => {
    const userId = 'Scott';

    // Example data for channels and user list
    const channels = ["Forum", "Chat", "Matches"];
    const users = ["Elon ", "Donald ", "Jeff"];

    return (
        <div className="app-container">
            <Top />
            <Sidebar channels={channels} users={users} />
            <div className="main-content">
                {/* <h1>Chat App</h1> */}
                <div className="chatWindow">
                    <MessageList />
                </div>
                <MessageInput userId={userId} />
            </div>
        </div>
    );
};

export default App;
