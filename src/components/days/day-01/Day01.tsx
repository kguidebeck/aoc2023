import DaySection from "../../day-section";
import { Digit } from "./Day01.model";
import data from "./data.json";

const Day01 = () => {
  const { values, digits } = data;

  const digitExceptions = ["two", "eight", "nine"];

  const convertDigits = () => {
    let convertedValues = [] as string[];

    values.forEach((value) => {
      let newValue = value;

      for (const word in digits) {
        if (value.includes(word)) {
          const convertedNum = digits[word as Digit];

          if (newValue.includes(word)) {
            newValue = newValue.replaceAll(word, convertedNum);
          }

          if (digitExceptions.includes(word)) {
            const cutFront = word.slice(1);
            const cutEnd = word.slice(0, -1);

            if (newValue.includes(cutFront)) {
              newValue = newValue.replaceAll(cutFront, convertedNum);
            }

            if (newValue.includes(cutEnd)) {
              newValue = newValue.replaceAll(cutEnd, convertedNum);
            }
          }
        }
      }

      convertedValues.push(newValue);
    });

    return convertedValues;
  };

  const calcCalibrationValue = (puzzleNum: 1 | 2) => {
    const initialValue = 0;
    let calibrationValues = values;
    let calibrationValue = 0;

    if (puzzleNum === 2) {
      calibrationValues = convertDigits();
    }

    calibrationValue = calibrationValues.reduce((totalValue, currentCode) => {
      let firstNum = "";
      let lastNum = "";

      for (let i = 0; i < currentCode.length; i++) {
        const currentChar = parseInt(currentCode[i]);
        if (!isNaN(currentChar)) {
          firstNum = currentCode[i];
          break;
        }
      }

      for (let i = currentCode.length - 1; i >= 0; i--) {
        const currentChar = parseInt(currentCode[i]);

        if (!isNaN(currentChar)) {
          lastNum = currentCode[i];
          break;
        }
      }

      const value = parseInt(firstNum + lastNum);

      return value + totalValue;
    }, initialValue);

    return calibrationValue;
  };

  return (
    <DaySection
      day={1}
      title="Trebuchet?!"
      puzzles={[
        { title: "Total Calibration Value", solution: calcCalibrationValue(1) },
        { title: "Total Calibration Value", solution: calcCalibrationValue(2) },
      ]}
    />
  );
};

export default Day01;
