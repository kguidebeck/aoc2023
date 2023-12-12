import DaySection from "../../day-section";
import tickets from "./data.json";

const Day04 = () => {
  const calcTotalPoints = () => {
    const points = [] as number[];

    tickets.forEach((ticket) => {
      let pointTotal = 0;

      ticket.winningNums.forEach((number) => {
        if (ticket.numbers.includes(number)) {
          pointTotal = pointTotal === 0 ? 1 : pointTotal * 2;
        }
      });

      points.push(pointTotal);
    });

    return points.reduce(
      (totalPoints, currentPoint) => totalPoints + currentPoint
    );
  };

  interface Ticket {
    winningNums: number[];
    numbers: number[];
    winningCount?: number;
  }

  interface TicketCopy {
    id: number;
    count: number;
    winningCount: number;
  }

  const calcTicketCount = () => {
    let ticketCount = tickets.length;
    const ticketCopies = [] as TicketCopy[];

    const generateWinningCount = () => {
      tickets.forEach((ticket: Ticket) => {
        let winningCount = 0;

        ticket.winningNums.forEach((number) => {
          if (ticket.numbers.includes(number)) {
            winningCount++;
          }
        });

        ticket.winningCount = winningCount;
      });
    };

    const generateCopies = (ticket: Ticket, index: number) => {
      Array.from({ length: ticket.winningCount ?? 0 }, (_, i) => i + 1).forEach(
        (ticketID) => {
          const existingTicket = ticketCopies.find(
            (ticket) => ticket.id === index + ticketID
          );

          if (existingTicket) {
            existingTicket.count++;
          } else {
            const ticketIndex = index + ticketID;
            const newTicket = {
              winningCount: ticket.winningCount,
              id: ticketIndex,
              count: 1,
            } as TicketCopy;

            ticketCopies.push(newTicket);
          }
        }
      );
    };

    generateWinningCount();

    tickets.forEach((ticket: Ticket, index) => {
      if (ticket.winningCount && ticket.winningCount > 0) {
        generateCopies(ticket, index);
      }

      const copies = ticketCopies.find((ticket) => ticket.id === index);

      if (copies) {
        for (let i = 0; i < copies.count; i++) {
          generateCopies(tickets[copies.id], index);
        }
      }
    });

    ticketCopies.forEach((ticket) => {
      ticketCount += ticket.count;
    });

    return ticketCount;
  };

  return (
    <DaySection
      day={4}
      title="Scratchcards"
      puzzles={[
        { title: "Total Ticket Points", solution: calcTotalPoints() },
        { title: "Total Tickets", solution: calcTicketCount() },
      ]}
    />
  );
};

export default Day04;
