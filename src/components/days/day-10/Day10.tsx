import styled from "styled-components";
import DaySection from "../../day-section";
import field from "./data.json";
import { rem } from "../../../styles/helpers";
import { Color } from "../../../styles/constants";
import { useEffect } from "react";

const FieldGrid = styled.div`
  margin: ${rem(30)} ${rem(15)};
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(140, 1fr);

  &:nth-of-type(even) {
    background: ${Color.greenLight};
    color: ${Color.black};
  }
`;

const FieldPipe = styled.div`
  border: 1px solid gray;
  min-width: 10px;
  text-align: center;

  --border: 1px solid ${Color.black};
  --op-border: 1 solid ${Color.red};

  &[data-active="true"] {
    background-color: ${Color.red};
    color: ${Color.black};
    border: none;

    &.pipe--horizontal {
      border-top: var(--border);
      border-bottom: var(--border);
      border-right: var(--op-border);
      border-left: var(--op-border);
    }

    &.pipe--vertical {
      border-right: var(--border);
      border-left: var(--border);
      border-top: var(--op-border);
      border-bottom: var(--op-border);
    }

    &.pipe--L,
    &.pipe--J {
      border-bottom: var(--border);
      border-top: var(--op-border);
    }

    &.pipe--J,
    &.pipe--7 {
      border-right: var(--border);
      border-left: var(--op-border);
    }

    &.pipe--L,
    &.pipe--F {
      border-left: var(--border);
      border-right: var(--op-border);
    }

    &.pipe--7,
    &.pipe--F {
      border-top: var(--border);
      border-bottom: var(--op-border);
    }

    &.pipe--start {
      background: ${Color.black};
      color: ${Color.white};
      border: 1px solid ${Color.black};
    }
  }
`;

enum Direction {
  NORTH = "north",
  EAST = "east",
  SOUTH = "south",
  WEST = "west",
}

const directions = {
  [Direction.NORTH]: ["7", "F", "|"],
  [Direction.EAST]: ["J", "7", "-"],
  [Direction.SOUTH]: ["L", "J", "|"],
  [Direction.WEST]: ["L", "F", "-"],
};

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

const pipes = [
  { type: "|", connections: ["north", "south"], class: "vertical" },
  { type: "-", connections: ["east", "west"], class: "horizontal" },
  { type: "L", connections: ["north", "east"], class: "L" },
  { type: "J", connections: ["north", "west"], class: "J" },
  { type: "7", connections: ["south", "west"], class: "7" },
  { type: "F", connections: ["south", "east"], class: "F" },
];

const Day10 = () => {
  const getPipe = (position: number[], direction: Direction) => {
    switch (direction) {
      case Direction.NORTH:
        return {
          pipe: field[position[0] - 1].charAt(position[1]),
          position: [position[0] - 1, position[1]],
        };
      case Direction.EAST:
        return {
          pipe: field[position[0]].charAt(position[1] + 1),
          position: [position[0], position[1] + 1],
        };
      case Direction.SOUTH:
        return {
          pipe: field[position[0] + 1].charAt(position[1]),
          position: [position[0] + 1, position[1]],
        };
      case Direction.WEST:
        return {
          pipe: field[position[0]].charAt(position[1] - 1),
          position: [position[0], position[1] - 1],
        };
    }
  };

  // Get the direction of the pipe the previous pipe is positioned on.
  const getDirectionChange = (currentPos: number[], newPos: number[]) => {
    if (currentPos[1] < newPos[1]) {
      return Direction.WEST;
    } else if (currentPos[1] > newPos[1]) {
      return Direction.EAST;
    } else if (currentPos[0] < newPos[0]) {
      return Direction.NORTH;
    } else if (currentPos[0] > newPos[0]) {
      return Direction.SOUTH;
    }
  };

  const getPipeClass = (pipeChar: string) => {
    const pipeObj = pipes.find((pipe) => pipe.type === pipeChar);

    if (pipeChar === "S") return "start";

    return pipeObj ? pipeObj.class : "";
  };

  const calcFarthestDistance = () => {
    let steps = 0;
    let position = [0, 0];
    let activePipe = "";
    let dirShift: Direction | undefined;
    const startingRowIndex = field.findIndex((row) => row.includes("S"));
    const startingRow = field[startingRowIndex];
    const startingIndex = startingRow?.indexOf("S");
    position = [startingRowIndex, startingIndex];

    // Color S
    const startingCell = document.querySelector(
      ".pipe--start"
    ) as HTMLDivElement;
    if (startingCell) {
      startingCell.dataset.active = "true";
    }

    while (activePipe !== "S") {
      if (activePipe === "") {
        for (const dir in directions) {
          const dirPipe = getPipe(position, dir as Direction);

          if (directions[dir as Direction].includes(dirPipe.pipe)) {
            dirShift = getDirectionChange(position, dirPipe.position);
            position = dirPipe.position;
            activePipe = dirPipe.pipe;
            steps++;

            // Visualization
            const pipeCell = document.querySelector(
              `div[data-row="${dirPipe.position[0]}"][data-index="${dirPipe.position[1]}"]`
            ) as HTMLDivElement;
            if (pipeCell) {
              pipeCell.dataset.active = "true";
            }

            break;
          }
        }
      } else {
        const currentPipe = activePipe;
        const currentShift = dirShift;
        const pipeType = pipes.find((pipe) => pipe.type === currentPipe);
        const dirChange = pipeType?.connections.find(
          (direction) => direction !== currentShift
        );
        const dirPipe = getPipe(position, dirChange as Direction);

        dirShift = getDirectionChange(position, dirPipe.position);
        position = dirPipe.position;
        activePipe = dirPipe.pipe;
        steps++;

        const pipeCell = document.querySelector(
          `div[data-row="${dirPipe.position[0]}"][data-index="${dirPipe.position[1]}"]`
        ) as HTMLDivElement;
        if (pipeCell) {
          pipeCell.dataset.active = "true";
        }
      }
    }

    return Math.floor((steps + 1) / 2);
  };

  useEffect(() => {
    calcFarthestDistance();
  }, []);

  return (
    <>
      <DaySection
        day={10}
        title="Pipe Maze"
        puzzles={
          [
            // {
            //   title: "Farthest Distance",
            //   solution: calcFarthestDistance(),
            // },
            //   {
            //     title: "(Prev) Extrapoliated Sum",
            //     solution: extrapolatedSum("prev"),
            //   },
          ]
        }
      />
      <FieldGrid>
        {field.map((row, rowIndex) => {
          const rowArr = row.split("");
          return (
            <FieldRow key={rowIndex}>
              {rowArr.map((char, charIndex) => {
                const pipeClass = getPipeClass(char);
                return (
                  <FieldPipe
                    key={charIndex}
                    className={pipeClass ? `pipe--${pipeClass}` : ""}
                    data-row={rowIndex}
                    data-index={charIndex}
                    data-active={false}
                  >
                    {char}
                  </FieldPipe>
                );
              })}
            </FieldRow>
          );
        })}
      </FieldGrid>
    </>
  );
};

export default Day10;
