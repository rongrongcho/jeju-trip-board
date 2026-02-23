import FlightTicket from './FlightTicket';
import { uiText } from '../../../content/uiText';
import { DayPlan } from '../types/travel';

type TotalTimelineProps = {
  plans: DayPlan[];
  onMoveToDay: (dayId: string) => void;
};

export default function TotalTimeline({ plans, onMoveToDay }: TotalTimelineProps) {
  return (
    <section className="total-board" aria-label={uiText.totalTimeline.ariaLabel}>
      <header className="total-board-head">
        <h2>{uiText.totalTimeline.title}</h2>
        <p>{uiText.totalTimeline.description}</p>
      </header>

      <div className="total-day-list">
        {plans.map((plan) => (
          <article key={plan.id} className="total-day-card open">
            <div className="total-day-top">
              <h3>{plan.label}</h3>
              <div className="total-day-actions">
                <button onClick={() => onMoveToDay(plan.id)}>{uiText.totalTimeline.moveToDayButton}</button>
              </div>
            </div>

            <div className="total-day-content">
              {plan.flight ? <FlightTicket flightText={plan.flight} compact /> : null}
              <ol className="total-timeline-list">
                {plan.places.map((place) => (
                  <li key={`${plan.id}-${place.id}`}>
                    <span className="total-point-dot" aria-hidden="true" />
                    <span className="total-time">{place.time}</span>
                    <strong>
                      {place.icon} {place.title}
                    </strong>
                    <span className="total-cat">{place.category}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
