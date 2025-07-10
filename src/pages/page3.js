// src/pages/page3.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../utils/PageWrapper';

function Page3({ setDirection }) {
  const navigate = useNavigate();
  const scrolled = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrolled.current && e.deltaY > 30) {
        scrolled.current = true;
        setDirection('down');
        navigate('/request1');
      }
      if (!scrolled.current && e.deltaY < -30) {
        scrolled.current = true;
        setDirection('up');
        navigate('/page2');
      }
    };

    const handleTouch = (() => {
      let startY = 0;
      return (e) => {
        if (e.type === 'touchstart') startY = e.touches[0].clientY;
        if (e.type === 'touchmove') {
          const endY = e.touches[0].clientY;
          const diff = startY - endY;
          if (!scrolled.current && diff > 30) {
            scrolled.current = true;
            setDirection('down');
            navigate('/request');
          } else if (!scrolled.current && diff < -30) {
            scrolled.current = true;
            setDirection('up');
            navigate('/page2');
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

  return (
    <PageWrapper>
      <div style={styles.container}>
        <div style={styles.textBox}>
          <p style={styles.line}>다시 만나고 싶은 그 사람의 이름과 번호를 적어주세요.</p>
          <p style={{ ...styles.line, marginTop: '40px' }}>
            그 사람도 당신을 떠올려 이곳에 이름을 남긴다면,
          </p>
          <p style={styles.line}>
            두 마음이 닿는 순간, 문자로 알려드릴게요.
          </p>
        </div>

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
    height: '120vh',
    background: 'linear-gradient(to bottom, #fff6f0, white)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "SM SEMyungJo Std, serif",
    color: '#603E00',
  },
  textBox: {
    textAlign: 'center',
    fontSize: '20px',
    lineHeight: '2em',
  },
  line: {
    margin: 0,
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
  arrowText: {
    fontSize: '14px',
    marginTop: '8px',
  },
};

export default Page3;
