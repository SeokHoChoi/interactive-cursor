import { useState, useEffect } from 'react';
import { RegionalItem, InteractiveCursorOptions } from '../types';
import { getRandomItem, getRegionalData } from '../utils/cursorHelpers';

export const useInteractiveCursor = (options: InteractiveCursorOptions) => {
  const {
    region = 'default',
    specialProducts = [],
    representativeAnimals = [],
    mode = 'random',
    interval = 2000,
    enabled = true,
  } = options;

  // 지역 데이터 통합
  const regionalData = getRegionalData(region);
  const mergedSpecialProducts = [
    ...regionalData.specialProducts,
    ...specialProducts,
  ];
  const mergedAnimals = [
    ...regionalData.representativeAnimals,
    ...representativeAnimals,
  ];

  const [currentItem, setCurrentItem] = useState<RegionalItem | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // 초기 아이템 설정
    const allItems = [...mergedSpecialProducts, ...mergedAnimals];
    if (allItems.length > 0) {
      setCurrentItem(allItems[0]);
    }

    // 랜덤 모드 처리
    let intervalId: NodeJS.Timeout | null = null;
    if (mode === 'random' && allItems.length > 1) {
      intervalId = setInterval(() => {
        const randomItem = getRandomItem(allItems);
        setCurrentItem(randomItem);
      }, interval);
    }

    // 정리 함수
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [mode, interval, enabled, mergedSpecialProducts, mergedAnimals]);

  return { currentItem };
};
