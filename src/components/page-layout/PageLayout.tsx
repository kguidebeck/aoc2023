import Day01 from "../days/day-01";
import Day02 from "../days/day-02";
import Day03 from "../days/day-03";
import Day04 from "../days/day-04";
import Day05 from "../days/day-05";
import Day06 from "../days/day-06";
import Day07 from "../days/day-07";
import { LayoutWrap, LayoutGrid } from "./PageLayout.styled";

const PageLayout = () => {
  const today = new Date();
  const day = today.getDate();
  let currentDate = day + 1;

  return (
    <LayoutWrap>
      <h1>Advent of Code 2023</h1>
      <LayoutGrid>
        {/* <Day01 />
        <Day02 />
        <Day03 />
        <Day04 />
        <Day05 />
        <Day06 /> */}
        <Day07 />
      </LayoutGrid>
    </LayoutWrap>
  );
};

export default PageLayout;
