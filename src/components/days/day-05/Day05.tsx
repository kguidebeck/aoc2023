import DaySection from "../../day-section";
import almanac from "./data.json";

enum MapType {
  SOIL = "soil",
  FERTILIZER = "fertilizer",
  WATER = "water",
  LIGHT = "light",
  TEMPERATURE = "temperature",
  HUMIDITY = "humidity",
  LOCATION = "location",
}

interface Almanac {
  seeds: number[];
  maps: {
    soil: number[][];
    fertilizer: number[][];
    water: number[][];
    light: number[][];
    temperature: number[][];
    humidity: number[][];
    location: number[][];
  };
}

const Day05 = () => {
  const { seeds, maps } = almanac as Almanac;

  const getSeedLocation = (seed: number) => {
    let mappedValue = seed; // current seed

    for (const mapType in maps) {
      const currentMap = maps[mapType as MapType];
      const currentValue = mappedValue;
      const relatedRange = currentMap.find(
        (mapRange: number[]) =>
          currentValue >= mapRange[1] &&
          currentValue <= mapRange[1] + mapRange[2]
      );

      if (relatedRange) {
        const rangeDifference = relatedRange[1] - relatedRange[0];

        if (rangeDifference < 0) {
          mappedValue = mappedValue + rangeDifference * -1;
        } else {
          mappedValue = mappedValue - rangeDifference;
        }
      }
    }

    return mappedValue;
  };

  const getSeedLocationCondensed = (seed: number) => {
    let mappedValue = seed; // current seed
    let lowestAvailableRange;

    for (const mapType in maps) {
      const currentMap = maps[mapType as MapType];
      const currentValue = mappedValue;
      const relatedRange = currentMap.find(
        (mapRange: number[]) =>
          currentValue >= mapRange[1] &&
          currentValue <= mapRange[1] + mapRange[2]
      );

      if (relatedRange) {
        const rangeDifference = relatedRange[1] - relatedRange[0];

        if (rangeDifference < 0) {
          mappedValue = mappedValue + rangeDifference * -1;
        } else {
          mappedValue = mappedValue - rangeDifference;
        }

        const remainingRange = relatedRange[0] + relatedRange[2] - mappedValue;

        if (
          lowestAvailableRange === undefined ||
          remainingRange < lowestAvailableRange
        ) {
          lowestAvailableRange = remainingRange;
        }
      } else {
        lowestAvailableRange = 0;
      }
    }

    return [mappedValue, lowestAvailableRange];
  };

  const calcLowestLocation = () => {
    let lowestLocation = 0;

    seeds.forEach((seed) => {
      const seedLocation = getSeedLocation(seed);

      if (lowestLocation === 0 || seedLocation < lowestLocation) {
        lowestLocation = seedLocation;
      }
    });

    return lowestLocation ?? "Error";
  };

  const calcLowestLocation2 = () => {
    const seedRanges = [] as number[][];
    let lowestLocation = 0;

    // Format Seed Data
    for (let currentSeed = 0; currentSeed < seeds.length; currentSeed += 2) {
      let rangeStart = seeds[currentSeed];
      let rangeLength = seeds[currentSeed + 1];
      const rangeEnd = rangeStart + rangeLength;

      const frontOverlap = seedRanges.find(
        (range) => rangeStart >= range[0] && rangeStart <= range[0] + range[1]
      );

      if (frontOverlap) {
        const overlapEnd = frontOverlap[0] + frontOverlap[1];

        // If entire range exists in another range...don't include.
        if (rangeEnd <= overlapEnd) return;

        const rangeAdjustment = overlapEnd - rangeStart;
        rangeStart = overlapEnd + 1;
        rangeLength = rangeLength - rangeAdjustment;
      }

      const backOverlap = seedRanges.find(
        (range) =>
          rangeEnd > range[0] &&
          rangeEnd < range[0] + range[1] &&
          rangeStart < range[0]
      );

      if (backOverlap) {
        rangeLength = rangeEnd - backOverlap[0];
      }

      seedRanges.push([rangeStart, rangeLength]);
    }

    const sortedSeeds = seedRanges.sort((a, b) => a[0] - b[0]);

    sortedSeeds.forEach((seedRange, index) => {
      // if (index > 0) return;
      for (let j = seedRange[0]; j < seedRange[0] + seedRange[1]; j++) {
        const seedLocation = getSeedLocationCondensed(j);

        if (seedLocation[0]) {
          if (lowestLocation === 0 || seedLocation[0] < lowestLocation) {
            lowestLocation = seedLocation[0];
          }
        }

        if (seedLocation[1]) {
          j += seedLocation[1] - 1;
        }
      }
    });

    // console.log(lowestLocation);
    return lowestLocation;
  };

  // calcLowestLocation2();

  return (
    <DaySection
      day={5}
      title="Coming Soon"
      puzzles={[
        // { title: "Lowest Seed Location", solution: calcLowestLocation() },
        { title: "Lowest Seed Location (XL)", solution: calcLowestLocation2() },
      ]}
    />
  );
};

export default Day05;
