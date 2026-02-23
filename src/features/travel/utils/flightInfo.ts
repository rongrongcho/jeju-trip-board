export type FlightInfo = {
  from: string;
  to: string;
  timeRange: string;
};

export function parseFlightInfo(flightText: string): FlightInfo | null {
  const matched = flightText.match(/^(.*?)\s*→\s*(.*?)\s+([0-9]{1,2}:[0-9]{2}\s*-\s*[0-9]{1,2}:[0-9]{2})$/);
  if (!matched) {
    return null;
  }

  return {
    from: matched[1].trim(),
    to: matched[2].trim(),
    timeRange: matched[3].trim(),
  };
}
