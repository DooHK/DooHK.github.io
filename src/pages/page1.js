// Page1.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../utils/PageWrapper';
import '../style/page1.css';

function Page1({ setDirection }) {
  const navigate = useNavigate();
  const lockedRef = useRef(false);
  const touchStartY = useRef(null);

  const goNext = useCallback(() => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setDirection('down');
    navigate('/page2');
  }, [navigate, setDirection]);

  useEffect(() => {
    const onWheel = (e) => {
      // deltaY가 충분히 크고(트랙패드 떨림 방지), 이미 이동 중이 아니면 이동
      if (!lockedRef.current && e.deltaY > 30) goNext();
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchMove = (e) => {
      if (touchStartY.current == null) return;
      const endY = e.touches?.[0]?.clientY ?? touchStartY.current;
      if (!lockedRef.current && touchStartY.current - endY > 30) goNext();
    };

    const onKeyDown = (e) => {
      // 접근성: 화살표↓, 스페이스, 페이지다운으로도 넘어가기
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        goNext();
      }
    };

    // passive로 성능/스크롤 저지 방지, document에 걸어 포커스 이슈 회피
    document.addEventListener('wheel', onWheel, { passive: true });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [goNext]);

  return (
    <PageWrapper>
      <div className="p1-container">
        <div className="p1-textBox">
          <p className="p1-line">누군가에게 아직 전하지 못한 마음이 있나요?</p>
          <p className="p1-line">아니면, 여전히 그리워하고 있나요?</p>
          <p className="p1-line p1-gapTop">그 사람도 당신을 떠올리고 있을지 몰라요.</p>
        </div>

        <div className="p1-arrowBox" aria-hidden>
          <div className="p1-lineDown" />
          <div className="p1-dot" />
          <p className="p1-arrowText">아래로</p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Page1;
