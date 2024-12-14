import React, { useState, useEffect, useRef, useMemo } from 'react';
import { InteractiveCursorProps, RegionalItem, CursorPosition } from './types';
import { getRandomItem } from './utils/cursorHelpers';

const DEFAULT_INTERVAL = 2000; // 2초
const DEFAULT_SIZE = 50; // 50px
const DEFAULT_REGION = 'default';

export const InteractiveCursor: React.FC<InteractiveCursorProps> = ({
  children,
  region = DEFAULT_REGION,
  specialProducts = [],
  representativeAnimals = [],
  mode = 'random',
  interval = DEFAULT_INTERVAL,
  size = DEFAULT_SIZE,
  enabled = true,
}) => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [currentItem, setCurrentItem] = useState<RegionalItem | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // 모든 아이템 통합
  const allItems = useMemo(
    () => [...specialProducts, ...representativeAnimals],
    [specialProducts, representativeAnimals]
  );

  useEffect(() => {
    if (!enabled || allItems.length === 0) return;

    // 초기 아이템 설정
    setCurrentItem(allItems[0]);

    // 마우스 이동 이벤트 핸들러
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // 랜덤 모드일 경우 주기적 아이템 변경
    let randomChangeInterval: NodeJS.Timeout | null = null;
    if (mode === 'random' && allItems.length > 1) {
      randomChangeInterval = setInterval(() => {
        const randomItem = getRandomItem(allItems);
        setCurrentItem(randomItem);
      }, interval);
    }

    // 이벤트 리스너 추가
    window.addEventListener('mousemove', handleMouseMove);

    // 정리 함수
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (randomChangeInterval) {
        clearInterval(randomChangeInterval);
      }
    };
  }, [enabled, mode, interval, allItems]);

  // 커서 아이템 렌더링
  const renderCursorItem = () => {
    if (!currentItem || !enabled) return null;

    const cursorStyle: React.CSSProperties = {
      position: 'fixed',
      left: `${cursorPosition.x}px`,
      top: `${cursorPosition.y}px`,
      transform: 'translate(-50%, -50%)',
      width: `${size}px`,
      height: `${size}px`,
      pointerEvents: 'none',
      zIndex: 9999,
    };

    // 이미지 URL인 경우
    if (typeof currentItem.image === 'string') {
      return (
        <div ref={cursorRef} style={cursorStyle}>
          <img
            src={currentItem.image}
            alt={currentItem.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      );
    }

    // 커스텀 React 노드인 경우
    return (
      <div ref={cursorRef} style={cursorStyle}>
        {currentItem.image}
      </div>
    );
  };

  return (
    <>
      {renderCursorItem()}
      {children}
    </>
  );
};

export default InteractiveCursor;
