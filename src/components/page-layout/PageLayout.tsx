import Day10 from "../days/day-10";
import { LayoutWrap, LayoutGrid } from "./PageLayout.styled";

const PageLayout = () => {
  return (
    <LayoutWrap>
      <h1>Advent of Code 2023</h1>
      <LayoutGrid>
        <Day10 />
      </LayoutGrid>
    </LayoutWrap>
  );
};

export default PageLayout;
