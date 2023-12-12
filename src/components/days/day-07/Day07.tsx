import DaySection from "../../day-section";
import hands from "./data.json";

enum FaceCard {
  T = "T",
  J = "J",
  Q = "Q",
  K = "K",
  A = "A",
}

const faceRanks = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

interface Hand {
  cards: "string";
  bid: number;
}

enum HandType {
  FIVE = "five",
  FOUR = "four",
  FULLHOUSE = "fullHouse",
  THREE = "three",
  TWOPAIR = "twoPair",
  ONEPAIR = "onePair",
}

const handTypes = {
  five: [/(.)\1{4}/g],
  four: [/(.)\1{3}/g],
  fullHouse: [/(.)\1{2}(.)\2{1}/g, /(.)\1{1}(.)\2{2}/g],
  three: [/(.)\1{2}/g],
  twoPair: [/(.)\1{1}(.)\2{1}/g, /(.)\1{1}(\w|\d)(.)\3{1}/g],
  onePair: [/(.)\1{1}/g],
};

const Day07 = () => {
  const getCardValue = (card: string, hasJokers: boolean) => {
    return isNaN(parseInt(card))
      ? hasJokers && card === FaceCard.J
        ? 1
        : faceRanks[card as FaceCard]
      : parseInt(card);
  };

  const compareCards = (cardA: string, cardB: string, hasJokers: boolean) => {
    const formatA = getCardValue(cardA, hasJokers);
    const formatB = getCardValue(cardB, hasJokers);

    if (formatA > formatB) {
      return -1;
    } else if (formatA < formatB) {
      return 1;
    }

    return 0;
  };

  const calcHandStrength = (cards: string, hasJokers: boolean): number => {
    let strength = 0;
    const cardsArr = cards.split("");

    cardsArr.sort((cardA: string, cardB: string) =>
      compareCards(cardA, cardB, hasJokers)
    );

    const sortedCards = cardsArr.join("");

    let handIndex = 0;
    for (const hand in handTypes) {
      let jokerBuff = 0;
      const handQuery = handTypes[hand as HandType];

      if (
        (handQuery.length > 1 &&
          (sortedCards.match(handQuery[0]) ||
            sortedCards.match(handQuery[1]))) ||
        sortedCards.match(handQuery[0])
      ) {
        if (hasJokers) {
          const jokerMatch = sortedCards.match(/J+/g);

          if (jokerMatch) {
            if (hand === HandType.FOUR) {
              // 9999J OR JJJJ9 -> FIVE (+1)
              jokerBuff = 1;
            } else if (hand === HandType.FULLHOUSE) {
              // 999JJ OR JJJKK -> FIVE (+2)
              jokerBuff = 2;
            } else if (hand === HandType.THREE) {
              // 999JK OR JJJ9K -> FOUR (+2)
              jokerBuff = 2;
            } else if (hand === HandType.TWOPAIR) {
              // 99JKK -> FULL (+2)
              // 99KJJ -> FOUR (+3)
              jokerBuff = jokerMatch[0].length === 1 ? 2 : 3;
            } else if (hand === HandType.ONEPAIR) {
              // 997KJ OR 97KJJ -> THREE (+2)
              jokerBuff = 2;
            }
          }
        }

        return 7 - handIndex + jokerBuff;
      }
      handIndex++;
    }

    // High Card
    if (strength === 0) {
      // 97K8J -> ONE PAIR (+1)
      return hasJokers && sortedCards.match(/J+/g) ? 2 : 1;
    }

    return strength;
  };

  const calcTotalWinnings = (hasJokers: boolean = false) => {
    const camelHands = hands as Hand[];
    camelHands.sort((handA: Hand, handB: Hand) => {
      const aCards = handA.cards;
      const bCards = handB.cards;
      const strengthA = calcHandStrength(aCards, hasJokers);
      const strengthB = calcHandStrength(bCards, hasJokers);

      if (strengthA > strengthB) {
        return -1;
      } else if (strengthA < strengthB) {
        return 1;
      } else {
        // check card strength
        let sortValue = 0;

        for (let i = 0; i < 5; i++) {
          const compareValue = compareCards(
            aCards.charAt(i),
            bCards.charAt(i),
            hasJokers
          );

          if (compareValue !== 0) {
            sortValue = compareValue;
            break;
          }
        }

        return sortValue;
      }
    });

    let totalWinnings = 0;

    camelHands.forEach((hand, index) => {
      const winningStrength = camelHands.length - index;

      totalWinnings += hand.bid * winningStrength;
    });

    return totalWinnings;
  };

  return (
    <DaySection
      day={7}
      title="Camel Cards"
      puzzles={[
        {
          title: "Total Winnings",
          solution: calcTotalWinnings(),
        },
        {
          title: "Total Winnings with Jokers",
          solution: calcTotalWinnings(true),
        },
      ]}
    />
  );
};

export default Day07;
