// src/pages/after1.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../utils/PageWrapper';

function After1({ setDirection }) {
  const navigate = useNavigate();
  const scrolled = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrolled.current && e.deltaY > 30) {
        scrolled.current = true;
        setDirection('down');
        navigate('/after2');
        // 향후 다음 페이지가 있다면 여기에 추가
        
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate, setDirection]);

  return (
    <PageWrapper>
      <div style={styles.container}>
        <p style={styles.line}>간절히 바라면 이루어진대요.</p>
        <p style={styles.line}>그 사람도 당신의 이름을 남긴다면,</p>
        <p style={styles.line}>조용히 문자를 보내드릴게요.</p>
        <p style={{ ...styles.line, marginTop: '40px' }}>
          당신의 인연이 꼭 이어지길, 진심으로 바랍니다.
        </p>

        <div style={styles.arrowBox}>
          <div style={styles.lineDown} />
          <div style={styles.dot} />
          <p style={styles.arrowText}>아래로</p>
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
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 30px',
  },
  line: {
    fontSize: '20px',
    margin: '12px 0',
  },
  arrowBox: {
    marginTop: '60px',
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
  arrowText: {
    fontSize: '14px',
    marginTop: '8px',
  },
};

export default After1;
