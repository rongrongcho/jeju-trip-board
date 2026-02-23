export type Place = {
  id: number;
  title: string;
  url?: string;
  time: string;
  category: string;
  detail: string;
  x: number;
  y: number;
  icon: string;
};

export type DayPlan = {
  id: string;
  label: string;
  flight?: string;
  places: Place[];
  highlights: string[];
};
