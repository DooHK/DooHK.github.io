import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../utils/PageWrapper';

function After2({ setDirection }) {
  const navigate = useNavigate();
  const scrolled = useRef(false);

  // ✅ 위로 드래그 → after1 이동
  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrolled.current && e.deltaY < -30) {
        scrolled.current = true;
        setDirection('up');
        navigate('/after1');
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
            navigate('/after1');
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

  const handleShare = async () => {
    const url = window.location.origin;

    try {
      if (navigator.share) {
        await navigator.share({
          title: '다시 만나고 싶은 사람에게',
          text: '이 웹사이트에서 인연을 찾을 수 있어요!',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      console.error('공유 중 오류:', error);
    }
  };

  return (
    <PageWrapper>
      <div style={styles.container}>
        <p style={styles.line}>이 웹 사이트를 공유해주신다면,</p>
        <p style={styles.line}>더 많은 사람들이 인연을 찾을 수 있을거에요.</p>
        <p style={{ ...styles.line, marginTop: '30px' }}>
          당신이 기다리는 그 사람이
        </p>
        <p style={styles.line}>이 웹 사이트를 더 빨리 알게 될지도 모르죠!</p>

        <button style={styles.shareButton} onClick={handleShare}>
          공유하기
        </button>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 30px',
    textAlign: 'center',
  },
  line: {
    fontSize: '20px',
    margin: '12px 0',
  },
  shareButton: {
    marginTop: '50px',
    fontSize: '18px',
    border: 'none',
    borderBottom: '1.5px solid #6D4C41',
    background: 'transparent',
    color: '#6D4C41',
    cursor: 'pointer',
    paddingBottom: '4px',
  },
};

export default After2;
