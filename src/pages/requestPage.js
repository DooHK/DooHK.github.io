// // src/pages/RequestPage.js
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PageWrapper from '../utils/PageWrapper';

// function SubmitPage({ setDirection }) {
//   const [name, setName] = useState('');
//   const [myPhone, setMyPhone] = useState('');
//   const [targetPhone, setTargetPhone] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const scrolled = useRef(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('https://sendrequest-gqqldsqdxq-uc.a.run.app', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, myPhone, targetPhone }),
//     });
//     const data = await res.json();
//     setMessage(data.message || '요청 완료!');
//   };

//   useEffect(() => {
//     const handleWheel = (e) => {
//       if (!scrolled.current && e.deltaY < -30) {
//         scrolled.current = true;
//         setDirection('up');
//         navigate('/request2');
//       }
//     };

//     const handleTouch = (() => {
//       let startY = 0;
//       return (e) => {
//         if (e.type === 'touchstart') startY = e.touches[0].clientY;
//         if (e.type === 'touchmove') {
//           const endY = e.touches[0].clientY;
//           if (!scrolled.current && endY - startY > 30) {
//             scrolled.current = true;
//             setDirection('up');
//             navigate('/');
//           }
//         }
//       };
//     })();

//     window.addEventListener('wheel', handleWheel, { passive: true });
//     window.addEventListener('touchstart', handleTouch, { passive: true });
//     window.addEventListener('touchmove', handleTouch, { passive: true });

//     return () => {
//       window.removeEventListener('wheel', handleWheel);
//       window.removeEventListener('touchstart', handleTouch);
//       window.removeEventListener('touchmove', handleTouch);
//     };
//   }, [navigate, setDirection]);

//   return (
//     <PageWrapper>
//       <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
//         <h2>연락 요청하기</h2>
//         <form onSubmit={handleSubmit}>
//           <input placeholder="이름" value={name} onChange={e => setName(e.target.value)} required />
//           <br /><br />
//           <input placeholder="내 전화번호" value={myPhone} onChange={e => setMyPhone(e.target.value)} required />
//           <br /><br />
//           <input placeholder="상대 전화번호" value={targetPhone} onChange={e => setTargetPhone(e.target.value)} required />
//           <br /><br />
//           <button type="submit">요청 보내기</button>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     </PageWrapper>
//   );
// }

// export default SubmitPage;
import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../utils/PageWrapper';
import { FormContext } from '../contexts/FormContext';

function SubmitPage({ setDirection }) {
  const { formData } = useContext(FormContext);
  const navigate = useNavigate();
  const scrolled = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrolled.current && e.deltaY < -30) {
        scrolled.current = true;
        setDirection('up');
        navigate('/request2');
      }
    };

    const handleTouch = (() => {
      let startY = 0;
      return (e) => {
        if (e.type === 'touchstart') startY = e.touches[0].clientY;
        if (e.type === 'touchmove') {
          const endY = e.touches[0].clientY;
          const diff = startY - endY;
          if (!scrolled.current && diff < -30) {
            scrolled.current = true;
            setDirection('up');
            navigate('/request2');
          }
        }
      };
    })();

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [navigate, setDirection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name: formData.myName, // 서버에서 name으로 받음
      myPhone: formData.myPhone,
      targetPhone: formData.targetPhone,
    };
  
    try {
      const res = await fetch('https://sendrequest-gqqldsqdxq-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert(data.message || '전송 완료되었습니다!');
      navigate('/after1'); // ✅ 여기서 이동
    } catch (err) {
      alert('전송에 실패했습니다.');
    }
  };
  return (
    <PageWrapper>
      <div style={styles.container}>
        <h2 style={styles.title}>전화번호와 이름을 확인해주세요.</h2>

        <div style={styles.infoContainer}>
          <div style={styles.card}>
            <h3 style={styles.role}>보내는 사람</h3>
            <p><strong>이름</strong><span style={styles.value}>{formData.myName}</span></p>
            <p><strong>전화번호</strong><span style={styles.value}>{formData.myPhone}</span></p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.role}>받는 사람</h3>
            <p><strong>이름</strong><span style={styles.value}>{formData.targetName}</span></p>
            <p><strong>전화번호</strong><span style={styles.value}>{formData.targetPhone}</span></p>
          </div>
        </div>

        <div style={styles.arrowBox}>
          <div style={styles.lineDown} />
          <div style={styles.dot} />
          <button style={styles.submitButton} onClick={handleSubmit}>전송하기</button>
        </div>
      </div>
    </PageWrapper>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to bottom, #fffaf7, white)',
    fontFamily: "'Noto Serif KR', serif",
    color: '#6D4C41',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
  },
  title: {
    fontSize: '22px',
    marginBottom: '60px',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '80px',
    width: '80%',
    maxWidth: '700px',
  },
  card: {
    fontSize: '17px',
    lineHeight: '2em',
  },
  role: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  value: {
    display: 'inline-block',
    borderBottom: '1px solid #c6a88c',
    marginLeft: '15px',
    paddingBottom: '2px',
    minWidth: '120px',
  },
  arrowBox: {
    marginTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  lineDown: {
    width: '2px',
    height: '40px',
    backgroundColor: '#6D4C41',
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#6D4C41',
    borderRadius: '50%',
    marginTop: '5px',
  },
  submitButton: {
    marginTop: '20px',
    border: '1px solid #6D4C41',
    borderRadius: '50px',
    background: 'transparent',
    color: '#6D4C41',
    padding: '8px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default SubmitPage;
