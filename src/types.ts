import { ReactNode } from 'react';

/**
 * 지역 아이템 인터페이스
 * 특산물 또는 대표 동물을 정의합니다.
 */
export interface RegionalItem {
  name: string;
  image: string | ReactNode; // SVG, 이미지 URL, 또는 React 컴포넌트
  description?: string; // 선택적 설명
}

/**
 * 지역 데이터 인터페이스
 * 특정 지역의 특산물과 대표 동물 정보를 포함합니다.
 */
export interface RegionalData {
  region: string;
  specialProducts: RegionalItem[];
  representativeAnimals: RegionalItem[];
}

/**
 * 인터랙티브 커서 옵션 인터페이스
 * 커서의 동작 및 표시 방식을 제어합니다.
 */
export interface InteractiveCursorOptions {
  region?: string;
  specialProducts?: RegionalItem[];
  representativeAnimals?: RegionalItem[];
  mode?: 'random' | 'follow';
  interval?: number; // 랜덤 변경 간격 (밀리초)
  size?: number; // 커서 아이콘 크기
  enabled?: boolean; // 라이브러리 활성화 여부
  customTransition?: boolean; // 커스텀 트랜지션 효과
}

/**
 * 인터랙티브 커서 Props
 * 컴포넌트에 전달되는 속성을 정의합니다.
 */
export interface InteractiveCursorProps extends InteractiveCursorOptions {
  children: ReactNode;
}

/**
 * 커서 위치 인터페이스
 * 마우스 커서의 x, y 좌표를 정의합니다.
 */
export interface CursorPosition {
  x: number;
  y: number;
}

/**
 * 지역 데이터 preset
 * 기본 제공되는 지역별 데이터
 */
export const RegionalPresets: Record<string, RegionalData> = {
  jeju: {
    region: '제주도',
    specialProducts: [
      {
        name: '감귤',
        image: '/images/citrus.svg',
        description: '제주도의 대표적인 과일',
      },
      {
        name: '흑돼지',
        image: '/images/black-pig.svg',
        description: '제주도 특산 흑돼지',
      },
    ],
    representativeAnimals: [
      {
        name: '제주 말',
        image: '/images/jeju-horse.svg',
        description: '천연기념물 제주마',
      },
    ],
  },
  // 다른 지역 프리셋 추가 가능
};
