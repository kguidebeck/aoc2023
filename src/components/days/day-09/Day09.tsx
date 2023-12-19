import DaySection from "../../day-section";
import report from "./data.json";

const Day09 = () => {
  const extrapolatedSum = (position: "prev" | "end" = "end") => {
    const extrapolatedValues = [] as number[];

    // for each history
    report.forEach((history, index) => {
      const activeHistory = [...history];
      const generatedDiffs = [] as number[][];
      generatedDiffs.push(activeHistory);
      let currentArr = activeHistory;

      // get difference between each value in array and create new array with those values
      // do this until all values are 0
      while (currentArr.find((value) => value !== 0)) {
        const newDiffs = [] as number[];
        const activeArr = currentArr;

        activeArr.forEach((value, activeIndex) => {
          if (activeIndex !== activeArr.length - 1) {
            // newDiffs.push(Math.abs(activeArr[activeIndex + 1] - value));
            newDiffs.push(activeArr[activeIndex + 1] - value);
          }
        });

        generatedDiffs.push(newDiffs);
        currentArr = newDiffs;
      }

      // work back up all arrays to find new last value (to ultimately get next value of original history)
      let diffIndex = generatedDiffs.length - 1;
      while (diffIndex > 0) {
        if (position === "end") {
          // Add 0 to end of first active array
          if (diffIndex === generatedDiffs.length - 1) {
            generatedDiffs[diffIndex].push(0);
          }
          // Index of last value in active array.
          const activeLastIndex = generatedDiffs[diffIndex].length - 1;
          // last value of active array
          const lastActive = generatedDiffs[diffIndex][activeLastIndex];
          // last value of previous array
          const lastPrevious = generatedDiffs[diffIndex - 1][activeLastIndex];
          generatedDiffs[diffIndex - 1].push(lastPrevious + lastActive);
        } else {
          // Add 0 to start of first active array
          if (diffIndex === generatedDiffs.length - 1) {
            generatedDiffs[diffIndex].unshift(0);
          }
          // last value of active array
          const startActive = generatedDiffs[diffIndex][0];
          // last value of previous array
          const startPrevious = generatedDiffs[diffIndex - 1][0];
          generatedDiffs[diffIndex - 1].unshift(startPrevious - startActive);
        }

        diffIndex--;
      }

      // Add that value to total array
      if (position === "end") {
        extrapolatedValues.push(
          generatedDiffs[0][generatedDiffs[0].length - 1]
        );
      } else {
        extrapolatedValues.push(generatedDiffs[0][0]);
      }
    });

    // add up all values in this array
    // return this value.
    return extrapolatedValues.reduce(
      (valuesTotal, currentValue) => valuesTotal + currentValue
    );
  };

  return (
    <DaySection
      day={9}
      title="Mirage Maintenance"
      puzzles={[
        {
          title: "(Next) Extrapoliated Sum",
          solution: extrapolatedSum("end"),
        },
        {
          title: "(Prev) Extrapoliated Sum",
          solution: extrapolatedSum("prev"),
        },
      ]}
    />
  );
};

export default Day09;
