type DayTabsProps = {
  tabs: Array<{ id: string; label: string }>;
  selectedTabId: string;
  onChange: (tabId: string) => void;
};

export default function DayTabs({ tabs, selectedTabId, onChange }: DayTabsProps) {
  return (
    <div className="day-tabs" role="tablist" aria-label="여행 일정 날짜 선택">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`day-tab ${tab.id === selectedTabId ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={tab.id === selectedTabId}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
