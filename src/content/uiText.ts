export const uiText = {
  hero: {
    kicker: 'CHODONGARI TRAVEL PLAN',
    title: 'JEJU HEALING',
    copy: 'Please be healing.',
  },
  tabs: {
    total: 'TOTAL',
  },
  themeSwitcher: {
    ariaLabel: '테마 전환',
    theme1: 'THEME 1',
    theme2: 'THEME 2',
  },
  map: {
    ariaLabel: '제주 지도와 방문 포인트',
    detailAriaLabel: (title: string) => `${title} 상세 보기`,
  },
  detail: {
    naverSearchLabel: '바로가기',
    naverSearchAriaLabel: (title: string) => `${title} 네이버 검색`,
  },
  highlights: {
    headingSuffix: '투어 포인트',
  },
  totalTimeline: {
    ariaLabel: '전체 일정 타임라인',
    title: 'TOTAL TIMELINE',
    description: '3일 전체 동선을 한 번에 보고, 원하는 날짜로 바로 이동할 수 있어요.',
    moveToDayButton: '이 날짜 보기',
    expandButton: '펼치기',
    collapseButton: '접기',
  },
  dayTimeline: {
    titleSuffix: 'TIMELINE',
    expandButton: '타임라인 펼치기',
    collapseButton: '타임라인 접기',
  },
  editor: {
    sectionAriaLabel: '핀 좌표 임시 저장 도구',
    description: '편집 모드 활성화됨. 핀을 드래그하고 좌표 텍스트를 복사하세요.',
    openPopupButton: '핀 좌표 저장 텍스트 만들기 (임시)',
    exportTitle: '핀 좌표 텍스트',
    exportDescription: '아래 텍스트를 복사해서 전달해 주세요.',
    exportCopyButton: '텍스트 복사',
    exportCloseButton: '닫기',
    exportDialogAriaLabel: '핀 좌표 텍스트 팝업',
    exportCopied: '복사 완료',
    exportCopyFailed: '자동 복사 실패, 텍스트를 직접 복사해 주세요.',
    exportHeader: (dayLabel: string) => `// 임시 저장 좌표 (${dayLabel})`,
  },
} as const;
