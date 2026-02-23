import { uiText } from '../../../content/uiText';

type HighlightsProps = {
  title: string;
  points: string[];
};

export default function Highlights({ title, points }: HighlightsProps) {
  return (
    <section className="highlights">
      <h3>
        {title} {uiText.highlights.headingSuffix}
      </h3>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
