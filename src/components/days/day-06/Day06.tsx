import DaySection from "../../day-section";
import races from "./data.json";

const Day06 = () => {
  const calcTotalRaceOptionProduct = () => {
    const totalOptions = [] as number[];

    races.forEach((race) => {
      const { time, recordDistance } = race;
      let raceOptions = 0;

      for (let i = 0; i <= time; i++) {
        const calcDistance = (time - i) * i;

        if (calcDistance > recordDistance) {
          raceOptions++;
        }
      }

      totalOptions.push(raceOptions);
    });

    return totalOptions.reduce((total, optionCount) => total * optionCount);
  };

  const calcSingleRaceOptions = () => {
    let raceOptions = 0;

    const race = {
      time: parseInt(
        races.reduce(
          (totalTime, currentRace) => totalTime + currentRace.time.toString(),
          ""
        )
      ),

      recordDistance: parseInt(
        races.reduce(
          (totalTime, currentRace) =>
            totalTime + currentRace.recordDistance.toString(),
          ""
        )
      ),
    };

    let optionPossible = false;
    let increment = 10;
    const raceStart = 11200895;
    const raceTime = 48487379;

    const checkRecordStatus = (currentTime: number) => {
      const calcDistance = (race.time - currentTime) * currentTime;

      return calcDistance > race.recordDistance;
    };

    for (let i = raceStart; i <= raceTime; i += increment) {
      const newRecord = checkRecordStatus(i);

      if (newRecord) {
        raceOptions += increment;

        if (!optionPossible) {
          optionPossible = true;
        }

        if (raceTime - increment < i) {
          let currentMS = i + 1;
          while (currentMS <= raceTime) {
            raceOptions++;
            currentMS++;
          }
        }
      } else {
        if (optionPossible) {
          return;
        }
      }
    }

    return raceOptions;
  };

  return (
    <DaySection
      day={6}
      title="Wait For It"
      puzzles={[
        {
          title: "Race Options Product",
          solution: calcTotalRaceOptionProduct(),
        },
        {
          title: "Single Race Total Options",
          solution: calcSingleRaceOptions(),
        },
      ]}
    />
  );
};

export default Day06;
