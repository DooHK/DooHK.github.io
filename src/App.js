// src/App.js
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [myPhone, setMyPhone] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://sendrequest-gqqldsqdxq-uc.a.run.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, myPhone, targetPhone }),
    });

    const data = await res.json();
    setMessage(data.message || '요청 완료!');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>연락 요청하기</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="이름" value={name} onChange={e => setName(e.target.value)} required />
        <br /><br />
        <input placeholder="내 전화번호" value={myPhone} onChange={e => setMyPhone(e.target.value)} required />
        <br /><br />
        <input placeholder="상대 전화번호" value={targetPhone} onChange={e => setTargetPhone(e.target.value)} required />
        <br /><br />
        <button type="submit">요청 보내기</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
