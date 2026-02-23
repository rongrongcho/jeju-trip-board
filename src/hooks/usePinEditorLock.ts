import { useEffect, useState } from 'react';

type UsePinEditorLockOptions = {
  password: string;
  shortcut: string;
  promptMessage: string;
  invalidPasswordMessage: string;
  onDeactivate?: () => void;
};

function matchesShortcut(event: KeyboardEvent, shortcut: string) {
  const parts = shortcut.toLowerCase().split('+').map((part) => part.trim());
  const mainKey = parts[parts.length - 1];

  if (parts.includes('ctrl') !== event.ctrlKey) {
    return false;
  }

  if (parts.includes('shift') !== event.shiftKey) {
    return false;
  }

  if (parts.includes('alt') !== event.altKey) {
    return false;
  }

  if (parts.includes('meta') !== event.metaKey) {
    return false;
  }

  return event.key.toLowerCase() === mainKey;
}

export default function usePinEditorLock({
  password,
  shortcut,
  promptMessage,
  invalidPasswordMessage,
  onDeactivate,
}: UsePinEditorLockOptions) {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!matchesShortcut(event, shortcut)) {
        return;
      }

      event.preventDefault();

      if (isEditMode) {
        setIsEditMode(false);
        onDeactivate?.();
        return;
      }

      const input = window.prompt(promptMessage);
      if (input === password) {
        setIsEditMode(true);
      } else if (input !== null) {
        window.alert(invalidPasswordMessage);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [invalidPasswordMessage, isEditMode, onDeactivate, password, promptMessage, shortcut]);

  return { isEditMode, setIsEditMode };
}
