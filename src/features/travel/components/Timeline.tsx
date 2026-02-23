import { Place } from '../types/travel';

type TimelineProps = {
  places: Place[];
  selectedPlaceId: number;
  onSelectPlace: (placeId: number) => void;
};

export default function Timeline({ places, selectedPlaceId, onSelectPlace }: TimelineProps) {
  return (
    <section className="timeline" aria-label="시간순 일정">
      {places.map((place) => (
        <button
          key={place.id}
          className={`timeline-card ${place.id === selectedPlaceId ? 'active' : ''}`}
          onClick={() => onSelectPlace(place.id)}
        >
          <span className="timeline-index">{place.id}</span>
          <p className="timeline-time">{place.time}</p>
          <strong>{place.title}</strong>
          <span className="timeline-meta">
            {place.icon} {place.category}
          </span>
        </button>
      ))}
    </section>
  );
}
