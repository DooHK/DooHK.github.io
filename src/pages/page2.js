import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../utils/PageWrapper';

function Page2({ setDirection }) {
  const navigate = useNavigate();
  const scrolled = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrolled.current && e.deltaY > 30) {
        scrolled.current = true;
        setDirection('down');
        navigate('/page3');
      }
      if (!scrolled.current && e.deltaY < -30) {
        scrolled.current = true;
        setDirection('up');
        navigate('/');
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
            navigate('/');
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
          <p style={styles.line}>선뜻 용기 내기 어려운 당신을 위해,</p>
          <p style={styles.line}>이곳에 마음을 담아둘 수 있도록 준비했어요.</p>
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
    height: '100vh',
    background: 'linear-gradient(to bottom, #fffaf7, white)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Noto Serif KR', serif",
    color: '#6D4C41',
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

export default Page2;
