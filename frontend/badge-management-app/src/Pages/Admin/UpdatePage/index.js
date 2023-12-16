import React from 'react';
import ChatBox from './components/ChatBox';
import { ApiKeyProvider } from './api/ApiKeyProvider';

function UpdatePage() {

    return (
    <ApiKeyProvider>
      <ChatBox />
    </ApiKeyProvider>
    );
}
export default UpdatePage;