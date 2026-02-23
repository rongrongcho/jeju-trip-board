export const pinEditorConfig = {
  password: process.env.REACT_APP_PIN_EDITOR_PASSWORD ?? 'jeju-pin-2026',
  shortcut: process.env.REACT_APP_PIN_EDITOR_SHORTCUT ?? 'ctrl+shift+m',
  promptMessage: '핀 편집 모드 비밀번호를 입력하세요',
  invalidPasswordMessage: '비밀번호가 일치하지 않습니다.',
} as const;
