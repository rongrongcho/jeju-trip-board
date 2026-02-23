import React, { useEffect, useState } from 'react';
import './App.css';
import {
  DayTabs,
  Highlights,
  MapPanel,
  PlaceDetail,
  Timeline,
  TotalTimeline,
} from './features/travel/components';
import { pinEditorConfig } from './config/pinEditor';
import { uiText } from './content/uiText';
import { jejuPlans } from './features/travel/data/jejuPlans';
import useTravelPlannerState from './features/travel/hooks/useTravelPlannerState';
import usePinEditorLock from './hooks/usePinEditorLock';

type ThemeId = 'theme-1' | 'theme-2';

function App() {
  const [themeId, setThemeId] = useState<ThemeId>('theme-1');
  const {
    selectedTabId,
    setSelectedTabId,
    isTotalTab,
    currentPlan,
    selectedPlace,
    setSelectedPlaceId,
    currentDayDraft,
    isDayTimelineOpen,
    tabs,
    handleChangePosition,
    toggleCurrentDayTimeline,
  } = useTravelPlannerState(jejuPlans, uiText.tabs.total);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [exportText, setExportText] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const { isEditMode } = usePinEditorLock({
    password: pinEditorConfig.password,
    shortcut: pinEditorConfig.shortcut,
    promptMessage: pinEditorConfig.promptMessage,
    invalidPasswordMessage: pinEditorConfig.invalidPasswordMessage,
    onDeactivate: () => setIsPopupOpen(false),
  });

  useEffect(() => {
    document.body.classList.toggle('theme-2-body', themeId === 'theme-2');
    document.body.classList.toggle('theme-1-body', themeId === 'theme-1');
    return () => {
      document.body.classList.remove('theme-2-body');
      document.body.classList.remove('theme-1-body');
    };
  }, [themeId]);

  const handleOpenExportPopup = () => {
    const lines = currentPlan.places
      .map((place) => {
        const position = currentDayDraft[place.id] ?? { x: place.x, y: place.y };
        return `  { id: ${place.id}, x: ${position.x.toFixed(1)}, y: ${position.y.toFixed(1)} },`;
      })
      .join('\n');

    const text = `${uiText.editor.exportHeader(currentPlan.label)}\n${lines}`;
    setExportText(text);
    setCopyStatus('idle');
    setIsPopupOpen(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  };

  return (
    <main className={`travel-app ${themeId}`}>
      <section className="hero">
        <p className="hero-kicker">{uiText.hero.kicker}</p>
        <h1>{uiText.hero.title}</h1>
        <p className="hero-copy">{uiText.hero.copy}</p>
        <DayTabs tabs={tabs} selectedTabId={selectedTabId} onChange={setSelectedTabId} />
      </section>

      {isTotalTab ? (
        <TotalTimeline plans={jejuPlans} onMoveToDay={setSelectedTabId} />
      ) : (
        <>
          <MapPanel
            plan={currentPlan}
            selectedPlace={selectedPlace}
            draftPositions={currentDayDraft}
            isEditMode={isEditMode}
            onSelectPlace={setSelectedPlaceId}
            onChangePosition={handleChangePosition}
          />

          {isEditMode ? (
            <section className="pin-tools" aria-label={uiText.editor.sectionAriaLabel}>
              <p>{uiText.editor.description}</p>
              <button className="pin-save-btn" onClick={handleOpenExportPopup}>
                {uiText.editor.openPopupButton}
              </button>
            </section>
          ) : null}

          <section className={`day-timeline-wrap ${isDayTimelineOpen ? 'open' : 'closed'}`}>
            <header className="day-timeline-head">
              <h3>
                {currentPlan.label} {uiText.dayTimeline.titleSuffix}
              </h3>
              <button onClick={toggleCurrentDayTimeline} aria-label={isDayTimelineOpen ? uiText.dayTimeline.collapseButton : uiText.dayTimeline.expandButton}>
                {isDayTimelineOpen ? '⌃' : '⌄'}
              </button>
            </header>
            {isDayTimelineOpen ? (
              <Timeline
                places={currentPlan.places}
                selectedPlaceId={selectedPlace.id}
                onSelectPlace={setSelectedPlaceId}
              />
            ) : null}
          </section>
          <PlaceDetail place={selectedPlace} />
          <Highlights title={currentPlan.label} points={currentPlan.highlights} />
        </>
      )}

      {isEditMode && isPopupOpen ? (
        <div className="popup-backdrop" role="dialog" aria-modal="true" aria-label={uiText.editor.exportDialogAriaLabel}>
          <section className="popup-panel">
            <h2>{uiText.editor.exportTitle}</h2>
            <p>{uiText.editor.exportDescription}</p>
            <textarea className="popup-text" value={exportText} readOnly />
            <div className="popup-actions">
              <button onClick={handleCopy}>{uiText.editor.exportCopyButton}</button>
              <button onClick={() => setIsPopupOpen(false)}>{uiText.editor.exportCloseButton}</button>
            </div>
            <p className="popup-status">
              {copyStatus === 'copied' ? uiText.editor.exportCopied : null}
              {copyStatus === 'failed' ? uiText.editor.exportCopyFailed : null}
            </p>
          </section>
        </div>
      ) : null}

      <div className="theme-switcher theme-switcher-min" role="group" aria-label={uiText.themeSwitcher.ariaLabel}>
        <button
          className={`theme-switch-btn ${themeId === 'theme-1' ? 'active' : ''}`}
          onClick={() => setThemeId('theme-1')}
        >
          {uiText.themeSwitcher.theme1}
        </button>
        <button
          className={`theme-switch-btn ${themeId === 'theme-2' ? 'active' : ''}`}
          onClick={() => setThemeId('theme-2')}
        >
          {uiText.themeSwitcher.theme2}
        </button>
      </div>
    </main>
  );
}

export default App;
