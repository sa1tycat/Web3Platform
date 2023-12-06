import React, { useState } from 'react';
import apiService from './apiService';

function BindStudentID() {
  const [DID, setDID] = useState('');
  const [studentID, setStudentID] = useState('');
  const [message, setMessage] = useState('');

  const handleBindStudentId = async () => {
    try {
      const response = await apiService.bindStudentId(DID, studentID);
      setMessage(response.message);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div>
      <input value={DID} onChange={e => setDID(e.target.value)} placeholder="DID" />
      <input value={studentID} onChange={e => setStudentID(e.target.value)} placeholder="Student ID" />
      <button onClick={handleBindStudentId}>Bind Student ID</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BindStudentID;
