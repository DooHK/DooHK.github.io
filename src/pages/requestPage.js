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
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    // 숫자만 추출
    const numbers = phoneNumber.replace(/[^\d]/g, '');
    // 010-0000-0000 형태로 포맷팅
    if (numbers.length === 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else if (numbers.length === 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    }
    return phoneNumber; // 형식이 맞지 않으면 원본 반환
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name: formData.myName, // 서버에서 name으로 받음
      myPhone: formData.myPhone,
      targetPhone: formData.targetPhone,
    };
  
    try {
      const res = await fetch('https://us-central1-again-18d3c.cloudfunctions.net/sendRequest', {
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
        <div style={styles.title}>전화번호와 이름을 확인해주세요.</div>

        <div style={styles.infoContainer}>
          <div style={styles.card}>
            <div style={styles.role}>보내는 사람</div>
            <div style={styles.infoItem}>
              <span style={styles.label}>이름</span>
              <span style={styles.value}>{formData.myName}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>전화번호</span>
              <span style={styles.value}>{formatPhoneNumber(formData.myPhone)}</span>
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.role}>받는 사람</div>
            <div style={styles.infoItem}>
              <span style={styles.label}>이름</span>
              <span style={styles.value}>{formData.targetName}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>전화번호</span>
              <span style={styles.value}>{formatPhoneNumber(formData.targetPhone)}</span>
            </div>
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
    weight: '100%',
    background: 'linear-gradient(to bottom, #fffaf7, white)',
    fontFamily: "SM SEMyungJo Std, serif",
    color: '#603E00',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
  },
  title: {
    fontSize: '25px',
    marginBottom: '70px',
    marginTop: '100px',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '180px',
    width: '80%',
    maxWidth: '700px',
    marginLeft: '-50px',
  },
  card: {
    fontSize: '17px',
    lineHeight: '1em',
    marginLeft: '20px',
  },
  role: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  label: {
    minWidth: '80px',
    textAlign: 'left',
  },
  value: {
    display: 'inline-block',
    borderBottom: '1px solid #c6a88c',
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
    height: '150px',
    background: 'linear-gradient(to top, #603E00, transparent)',
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#6D4C41',
    borderRadius: '50%',
    marginTop: '0px',
    color : '#603E00',
  },
  submitButton: {
    marginTop: '-5px',
    height: '48px',
    border: '2px solid #6D4C41',
    borderRadius: '50%',
    background: 'transparent',
    color: '#6D4C41',
    padding: '12px 26px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default SubmitPage;
