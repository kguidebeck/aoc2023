import DaySection from "../../day-section";
import { CubeColor, Grab } from "./Day02.model";
import games from "./data.json";

const Day02 = () => {
  const calcPossibleGames = () => {
    const availableColors = {
      red: 12,
      green: 13,
      blue: 14,
    };

    const possibleGames = [] as number[];

    games.forEach((game: Grab[], index) => {
      const gameID = index + 1;
      let isPossible = true;

      // Loop through each grab in a game
      game.forEach((grab) => {
        // Check against each color of dice grabbed
        for (const color in grab) {
          const grabCount = grab[color as CubeColor];
          const maxCount = availableColors[color as CubeColor];

          if (grabCount && grabCount > maxCount) {
            isPossible = false;
            break;
          }
        }

        if (!isPossible) {
          return;
        }
      });

      if (isPossible) {
        possibleGames.push(gameID);
      }
    });

    return possibleGames.reduce(
      (totalValue, currentID) => totalValue + currentID
    );
  };

  const calcGamePower = () => {
    const gamePowers = [] as number[];

    games.forEach((game: Grab[], index) => {
      let gamePower = 1;
      const maxCount = {
        red: 0,
        blue: 0,
        green: 0,
      };

      // Loop through each grab in a game
      game.forEach((grab) => {
        // Check against each color of dice grabbed
        for (const color in grab) {
          const grabCount = grab[color as CubeColor];
          const colorMax = maxCount[color as CubeColor];

          if (grabCount && grabCount > colorMax) {
            maxCount[color as CubeColor] = grabCount;
          }
        }
      });

      for (const color in maxCount) {
        gamePower *= maxCount[color as CubeColor];
      }

      gamePowers.push(gamePower);
    });

    return gamePowers.reduce(
      (totalPower, currentPower) => totalPower + currentPower
    );
  };

  return (
    <DaySection
      day={2}
      title="Cube Conundrum"
      puzzles={[
        { title: "Possible Game ID Sum", solution: calcPossibleGames() },
        { title: "Total Game Power", solution: calcGamePower() },
      ]}
    />
  );
};

export default Day02;
