import { useCallback, useEffect, useRef, useState } from 'react';
import jejuMapImage from '../../../assets/jejumap.png';
import FlightTicket from './FlightTicket';
import { uiText } from '../../../content/uiText';
import { DayPlan, Place } from '../types/travel';

type Position = {
  x: number;
  y: number;
};

type MapPanelProps = {
  plan: DayPlan;
  selectedPlace: Place;
  draftPositions: Record<number, Position>;
  isEditMode: boolean;
  onSelectPlace: (placeId: number) => void;
  onChangePosition: (placeId: number, position: Position) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

export default function MapPanel({
  plan,
  selectedPlace,
  draftPositions,
  isEditMode,
  onSelectPlace,
  onChangePosition,
}: MapPanelProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const updatePositionFromClient = useCallback(
    (clientX: number, clientY: number, placeId: number) => {
      const mapElement = mapRef.current;
      if (!mapElement) {
        return;
      }

      const rect = mapElement.getBoundingClientRect();
      const xPercent = ((clientX - rect.left) / rect.width) * 100;
      const yPercent = ((clientY - rect.top) / rect.height) * 100;

      onChangePosition(placeId, {
        x: toOneDecimal(clamp(xPercent, 2, 98)),
        y: toOneDecimal(clamp(yPercent, 2, 98)),
      });
    },
    [onChangePosition]
  );

  useEffect(() => {
    if (draggingId === null) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      updatePositionFromClient(event.clientX, event.clientY, draggingId);
    };

    const handlePointerEnd = () => {
      setDraggingId(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerEnd);
    window.addEventListener('pointercancel', handlePointerEnd);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
    };
  }, [draggingId, updatePositionFromClient]);

  return (
    <section className="map-panel">
      <div
        ref={mapRef}
        className={`island-map ${draggingId !== null ? 'dragging' : ''} ${isEditMode ? 'edit-mode' : ''}`}
        aria-label={uiText.map.ariaLabel}
      >
        <img src={jejuMapImage} alt="제주도 지도" className="map-image" />
        {plan.places.map((place) => {
          const position = draftPositions[place.id] ?? { x: place.x, y: place.y };

          return (
            <button
              key={place.id}
              className={`map-pin ${place.id === selectedPlace.id ? 'active' : ''}`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                zIndex: place.id === selectedPlace.id ? 40 : 10 + place.id,
              }}
              onClick={() => onSelectPlace(place.id)}
              onPointerDown={(event) => {
                if (!isEditMode) {
                  return;
                }
                event.preventDefault();
                onSelectPlace(place.id);
                setDraggingId(place.id);
                updatePositionFromClient(event.clientX, event.clientY, place.id);
              }}
              aria-label={uiText.map.detailAriaLabel(place.title)}
            >
              {place.id}
            </button>
          );
        })}
      </div>
      {plan.flight ? <FlightTicket flightText={plan.flight} /> : null}
    </section>
  );
}
