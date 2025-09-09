import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../utils/PageWrapper';
import '../style/page1.css';

function Page1({ setDirection }) {
  const navigate = useNavigate();
  const scrolled = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrolled.current && e.deltaY > 30) {
        scrolled.current = true;
        setDirection('down');
        navigate('/page2');
      }
    };

    const handleTouch = (() => {
      let startY = 0;
      return (e) => {
        if (e.type === 'touchstart') startY = e.touches[0].clientY;
        if (e.type === 'touchmove') {
          const endY = e.touches[0].clientY;
          if (!scrolled.current && startY - endY > 30) {
            scrolled.current = true;
            setDirection('down');
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
      <div className = "container">
        <div className='textBox'>
          <p clssname= 'line'>누군가에게 아직 전하지 못한 마음이 있나요?</p>
          <p clssname= 'line'>아니면, 여전히 그리워하고 있나요?</p>
          <p className='linemargin'>
            그 사람도 당신을 떠올리고 있을지 몰라요.
          </p>
        </div>
        <div className='arrowBox'>
          <div className='lineDown' />
          <div className='dot' />
          <p className='arrowText'>아래로</p>
        </div>
      </div>
    </PageWrapper>
  );
}

// const styles = {
//   container: {
//     height: '120vh',
//     background: 'linear-gradient(to bottom, #fff6f0, white)',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontFamily: "SM SEMyungJo Std, serif",
//     color: '#603E00',
//   },
//   textBox: {
//     textAlign: 'center',
//     fontSize: '20px',
//     lineHeight: '2em',
//   },
//   line: {
//     margin: 0,
//   },
//   arrowBox: {
//     marginTop: '80px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   lineDown: {
//     width: '2px',
//     height: '150px',
//     background: 'linear-gradient(to top, #603E00, transparent)',
//   },
//   dot: {
//     width: '8px',
//     height: '8px',
//     backgroundColor: '#6D4C41',
//     borderRadius: '50%',
//     marginTop: '0px',
//     color : '#603E00',
//   },
//   arrowText: {
//     fontSize: '14px',
//     marginTop: '8px',
//   },
    
  
// };

export default Page1;
