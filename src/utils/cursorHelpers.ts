import { RegionalItem } from '../types';

/**
 * 배열에서 랜덤한 아이템 선택
 * @param items 선택할 아이템 배열
 * @returns 랜덤으로 선택된 아이템
 */
export const getRandomItem = (items: RegionalItem[]): RegionalItem => {
  if (items.length === 0) {
    throw new Error('아이템 배열이 비어있습니다.');
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

/**
 * 특정 지역의 기본 데이터 제공
 * @param region 지역명
 * @returns 해당 지역의 특산물 및 대표 동물 데이터
 */
export const getRegionalData = (region: string) => {
  const regionalDataMap = {
    jeju: {
      region: '제주',
      specialProducts: [
        {
          name: '감귤',
          image: 'https://example.com/jeju-tangerine.png',
        },
        {
          name: '흑돼지',
          image: 'https://example.com/jeju-black-pig.png',
        },
        {
          name: '한라봉',
          image: 'https://example.com/jeju-hallabong.png',
        },
      ],
      representativeAnimals: [
        {
          name: '제주말',
          image: 'https://example.com/jeju-horse.png',
        },
        {
          name: '바다거북',
          image: 'https://example.com/jeju-turtle.png',
        },
      ],
    },
    // 다른 지역 데이터 추가 가능
    default: {
      region: '기본',
      specialProducts: [],
      representativeAnimals: [],
    },
  };

  return (
    regionalDataMap[region as keyof typeof regionalDataMap] ||
    regionalDataMap.default
  );
};
