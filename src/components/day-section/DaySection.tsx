import { StyledSection } from "./DaySection.styled";

interface Puzzle {
  title: string;
  solution?: number;
}

interface DayProps {
  day: number;
  title: string;
  puzzles?: Puzzle[];
}

const DaySection = ({ day, title, puzzles }: DayProps) => {
  return (
    <StyledSection>
      <h2>
        <a
          href={`https://adventofcode.com/2023/day/${day}`}
          target="_blank"
          rel="noreferrer"
        >
          Day {day.toString().padStart(2, "0")} - {title}
        </a>
      </h2>
      {puzzles &&
        puzzles.map((puzzle, index) => (
          <div key={index}>
            <h3>Puzzle {index + 1}</h3>
            <p>
              {puzzle.title}: {puzzle.solution}
            </p>
          </div>
        ))}
    </StyledSection>
  );
};

export default DaySection;
