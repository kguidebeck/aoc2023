import DaySection from "../../day-section";
import engine from "./data.json";

interface PossiblePart {
  value: string;
  numStart: number;
}

const Day03 = () => {
  const calcPartsSum = () => {
    const engineParts = [] as number[];
    const specialChar = /[^(.\d)]/g;

    engine.forEach((line, index) => {
      const numberReg = /(\d+)/g;
      let regResult: RegExpExecArray | null;
      // Get array of all numbers in a line
      const numbers = [] as PossiblePart[];

      while ((regResult = numberReg.exec(line)) != null) {
        numbers.push({
          value: regResult[0],
          numStart: regResult.index,
        });
      }

      // Loop through every number.
      numbers?.forEach((currentNum: PossiblePart) => {
        let isPart = false;
        const { value, numStart } = currentNum;
        const numEnd = numStart + value.length;
        const rangeStart = numStart === 0 ? numStart : numStart - 1;
        const rangeEnd = numEnd === line.length - 1 ? numEnd : numEnd + 1;
        const activeLines = [] as string[];

        if (index > 0) {
          activeLines.push(engine[index - 1].substring(rangeStart, rangeEnd));
        }

        activeLines.push(line.substring(rangeStart, rangeEnd));

        if (index < engine.length - 1) {
          activeLines.push(engine[index + 1].substring(rangeStart, rangeEnd));
        }

        activeLines.forEach((activeLine) => {
          if (activeLine.match(specialChar)) {
            isPart = true;
            return;
          }
        });

        if (isPart) {
          engineParts.push(parseInt(value));
        }
      });
    });

    return engineParts.reduce(
      (totalParts, currentPart) => totalParts + currentPart
    );
  };

  const calcGearRatio = () => {
    const gearRatios = [] as number[];
    const singleDigitRegex = /\d/g;
    const multiDigitRegex = /\d+/g;
    const wrappedDigits = /\d{1}\.\d{1}/g;

    const lookBehind = (line: string, input: string, start: number) => {
      let finalInput = input;
      let currentIndex = start - 1;
      let currentChar = line.charAt(currentIndex);

      while (currentIndex >= 0 && currentChar.match(singleDigitRegex)) {
        finalInput = currentChar + finalInput;
        currentIndex--;
        currentChar = line[currentIndex];
      }

      return parseInt(finalInput);
    };

    const lookAhead = (line: string, input: string, start: number) => {
      let finalInput = input;
      let currentIndex = start + input.length;
      let currentChar = line.charAt(currentIndex);

      while (
        currentIndex <= line.length - 1 &&
        currentChar.match(singleDigitRegex)
      ) {
        finalInput = finalInput + currentChar;
        currentIndex++;
        currentChar = line[currentIndex];
      }

      return parseInt(finalInput);
    };

    const getNeighborLineNumber = (
      linePos: "prev" | "next",
      activeIndex: number,
      rangeInput: string,
      rangeStart: number
    ) => {
      const activeLine =
        linePos === "prev" ? engine[activeIndex - 1] : engine[activeIndex + 1];
      const match = rangeInput.match(multiDigitRegex);
      const initialMatch = match?.[0] ?? "";

      const start = rangeInput.indexOf(initialMatch);
      const numArr = [];
      let partNumber = 1;

      if (start === 0) {
        if (initialMatch.length === 3) {
          partNumber = parseInt(initialMatch);
        } else {
          if (rangeInput.match(wrappedDigits)) {
            let secondaryPart = lookAhead(
              activeLine,
              rangeInput[2],
              rangeStart + 2
            );
            numArr.push(secondaryPart);
          }

          partNumber = lookBehind(activeLine, initialMatch, rangeStart);
        }
      } else {
        partNumber = lookAhead(activeLine, initialMatch, rangeStart + start);
      }

      numArr.push(partNumber);

      return numArr;
    };

    engine.forEach((line, index) => {
      const gearReg = /\*/g;
      let regResult: RegExpExecArray | null;

      while ((regResult = gearReg.exec(line)) != null) {
        const startIndex = regResult.index - 1;
        const endIndex = regResult.index + 1;
        const rangeEnd = endIndex + 1;
        const ratio = [] as number[];
        const prevLine = engine[index - 1].substring(startIndex, rangeEnd);
        const activeLine = line.substring(startIndex, rangeEnd);
        const nextLine = engine[index + 1].substring(startIndex, rangeEnd);

        if (prevLine.match(multiDigitRegex)) {
          const prevNums = getNeighborLineNumber(
            "prev",
            index,
            prevLine,
            startIndex
          );

          prevNums.forEach((num) => {
            ratio.push(num);
          });
        }

        if (activeLine.charAt(0).match(singleDigitRegex)) {
          ratio.push(lookBehind(line, line.charAt(startIndex), startIndex));
        }

        if (activeLine.charAt(2).match(singleDigitRegex)) {
          ratio.push(lookAhead(line, line.charAt(endIndex), endIndex));
        }

        if (nextLine.match(multiDigitRegex)) {
          const nextNums = getNeighborLineNumber(
            "next",
            index,
            nextLine,
            startIndex
          );

          nextNums.forEach((num) => {
            ratio.push(num);
          });
        }

        if (ratio.length > 1) {
          gearRatios.push(
            ratio.reduce(
              (totalRatio, currentRatio) => totalRatio * currentRatio
            )
          );
        }
      }
    });

    return gearRatios.reduce(
      (totalRatio, currentRatio) => totalRatio + currentRatio
    );
  };

  return (
    <DaySection
      day={3}
      title="Gear Ratios"
      puzzles={[
        { title: "Sum of Engine Parts", solution: calcPartsSum() },
        { title: "Total Gear Ratio", solution: calcGearRatio() },
      ]}
    />
  );
};

export default Day03;
