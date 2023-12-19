import DaySection from "../../day-section";
import map from "./data.json";
import bruteResults from "./brute-results.json";

enum MapDirection {
  "LEFT" = "L",
  "RIGHT" = "R",
}

const directionValue = {
  [MapDirection.LEFT]: 0,
  [MapDirection.RIGHT]: 1,
};

type PathOptions = string[];
type PathName = string;

interface Map {
  directions: string[];
  paths: Record<PathName, PathOptions>;
}

const Day08 = () => {
  const { directions, paths } = map as Map;

  const calcTotalSteps = () => {
    let totalSteps = 0;
    let index = 0;
    let activePathName = "AAA";
    const endPath = "ZZZ";

    while (activePathName !== endPath) {
      const direction = directionValue[directions[index] as MapDirection];
      const activePath = paths[activePathName];

      activePathName = activePath[direction];

      index++;

      if (index > directions.length - 1) {
        index = 0;
      }

      totalSteps++;
    }

    return totalSteps;
  };

  const calcTotalGhostSteps = () => {
    let totalSteps = bruteResults[bruteResults.length - 1].totalSteps;
    let dirIndex = bruteResults[bruteResults.length - 1].dirIndex;
    // const pathsArr = Object.keys(paths).filter((key) => key.match(/\w{2}A/g));
    const pathsArr = bruteResults[bruteResults.length - 1].paths;
    const increment = 1000000000;

    // while (pathsArr.find((path) => path.match(/\w{2}([A-Y]{1})/g))) {
    while (
      totalSteps < totalSteps + increment &&
      pathsArr.find((path) => path.match(/\w{2}([A-Y]{1})/g))
    ) {
      const direction = directionValue[directions[dirIndex] as MapDirection];

      pathsArr.forEach((path, index) => {
        const activePath = paths[path];
        pathsArr[index] = activePath[direction];

        // if (activePath[direction].match(/\w{2}(Z{1})/g)) {
        //   console.log("----", totalSteps, "----");
        //   console.log("Z PATH: ", activePath[direction], " -- ", index);
        // }
      });

      dirIndex++;

      if (dirIndex > directions.length - 1) {
        dirIndex = 0;
      }

      totalSteps++;
    }

    console.log("-------------");
    console.log("[", totalSteps, "]: ", pathsArr);
    console.log("Direction Index: ", dirIndex);

    return totalSteps;
  };

  return (
    <DaySection
      day={8}
      title="Haunted Wasteland"
      puzzles={[
        // {
        //   title: "Total Steps",
        //   solution: calcTotalSteps(),
        // },
        {
          title: "Total Ghost Steps",
          solution: calcTotalGhostSteps(),
        },
      ]}
    />
  );
};

export default Day08;
