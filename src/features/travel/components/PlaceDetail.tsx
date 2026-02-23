import { uiText } from '../../../content/uiText';
import { Place } from '../types/travel';
import { resolvePlaceUrl } from '../utils/naverSearch';

type PlaceDetailProps = {
  place: Place;
};

export default function PlaceDetail({ place }: PlaceDetailProps) {
  const placeUrl = resolvePlaceUrl(place.title, place.url);

  return (
    <section className="detail-card" aria-live="polite">
      <p className="detail-time">{place.time}</p>
      <h2>
        {place.icon} {place.title}
      </h2>
      <p>{place.detail}</p>
      <div className="detail-actions">
        <a
          className="detail-search-link"
          href={placeUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={uiText.detail.naverSearchAriaLabel(place.title)}
        >
          {uiText.detail.naverSearchLabel}
        </a>
      </div>
    </section>
  );
}
