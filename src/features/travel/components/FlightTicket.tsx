import { parseFlightInfo } from '../utils/flightInfo';

type FlightTicketProps = {
  flightText: string;
  compact?: boolean;
};

export default function FlightTicket({ flightText, compact = false }: FlightTicketProps) {
  const info = parseFlightInfo(flightText);

  if (!info) {
    return <aside className={`flight-ticket ${compact ? 'compact' : ''}`}>{flightText}</aside>;
  }

  return (
    <aside className={`flight-ticket ${compact ? 'compact' : ''}`} aria-label="비행기 일정 정보">
      <div className="flight-ticket-top" />
      <div className="flight-ticket-body">
        <span className="flight-ticket-barcode" aria-hidden="true" />
        <div className="flight-ticket-main">
          <strong>
            {info.from} - {info.to}
          </strong>
          <p>{info.timeRange}</p>
        </div>
      </div>
    </aside>
  );
}
