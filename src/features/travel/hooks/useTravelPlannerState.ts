import { useEffect, useMemo, useState } from 'react';
import { TOTAL_TAB_ID } from '../constants';
import { DayPlan } from '../types/travel';

export type Position = {
  x: number;
  y: number;
};

type DraftPinPositions = Record<string, Record<number, Position>>;
type DayTimelineOpenState = Record<string, boolean>;

export default function useTravelPlannerState(plans: DayPlan[], totalTabLabel: string) {
  const [selectedTabId, setSelectedTabId] = useState(plans[0]?.id ?? '');
  const [selectedPlaceId, setSelectedPlaceId] = useState(plans[0]?.places[0]?.id ?? 0);
  const [draftPinPositions, setDraftPinPositions] = useState<DraftPinPositions>({});
  const [dayTimelineOpenState, setDayTimelineOpenState] = useState<DayTimelineOpenState>({});

  const isTotalTab = selectedTabId === TOTAL_TAB_ID;

  const currentPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedTabId) ?? plans[0],
    [plans, selectedTabId]
  );

  useEffect(() => {
    if (!currentPlan?.places?.length) {
      return;
    }
    setSelectedPlaceId(currentPlan.places[0].id);
  }, [currentPlan]);

  const currentDayDraft = draftPinPositions[currentPlan.id] ?? {};
  const isDayTimelineOpen = dayTimelineOpenState[currentPlan.id] ?? true;

  const tabs = useMemo(
    () => [...plans.map((plan) => ({ id: plan.id, label: plan.label })), { id: TOTAL_TAB_ID, label: totalTabLabel }],
    [plans, totalTabLabel]
  );

  const selectedPlace = useMemo(
    () => currentPlan.places.find((place) => place.id === selectedPlaceId) ?? currentPlan.places[0],
    [currentPlan, selectedPlaceId]
  );

  const handleChangePosition = (placeId: number, position: Position) => {
    setDraftPinPositions((prev) => ({
      ...prev,
      [currentPlan.id]: {
        ...(prev[currentPlan.id] ?? {}),
        [placeId]: position,
      },
    }));
  };

  const toggleCurrentDayTimeline = () => {
    setDayTimelineOpenState((prev) => ({
      ...prev,
      [currentPlan.id]: !(prev[currentPlan.id] ?? true),
    }));
  };

  return {
    selectedTabId,
    setSelectedTabId,
    isTotalTab,
    currentPlan,
    selectedPlace,
    selectedPlaceId,
    setSelectedPlaceId,
    currentDayDraft,
    isDayTimelineOpen,
    tabs,
    handleChangePosition,
    toggleCurrentDayTimeline,
  };
}
