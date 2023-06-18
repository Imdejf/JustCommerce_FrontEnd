import InfoBox, { infoBoxTestIds } from "./InfoBox";

import { renderWithRouter } from "../../../../utils/testUtils";
import Placeholder from "../../../../assets/images/placeholder.png";

const TetingComponent = () => (
  <InfoBox>
    <InfoBox.Image src={Placeholder} />

    <InfoBox.Items>
      <InfoBox.InfoItem label="itemLabel" value="itemValue" />

      <InfoBox.LinkItem
        label="linkItemLabel"
        href="/someLink"
        value="linkItemLabel"
      />
    </InfoBox.Items>
    <div data-testid={infoBoxTestIds.infoBoxCustomChild}>Custom child</div>
  </InfoBox>
);

const renderBox = () => {
  return renderWithRouter(<TetingComponent />);
};

describe("InfoBox Component", () => {
  test("should render box properly", () => {
    const { getByTestId } = renderBox();
    const box = getByTestId(infoBoxTestIds.infoBox);
    expect(box).toBeInTheDocument();
  });

  test("should render image properly", () => {
    const { getByTestId } = renderBox();
    const image = getByTestId(infoBoxTestIds.infoBoxImage);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", Placeholder);
  });

  test("should render itmes list properly", () => {
    const { getByTestId } = renderBox();

    const list = getByTestId(infoBoxTestIds.infoBoxItems);
    expect(list).toBeInTheDocument();
    expect(list.childElementCount).toBe(2);
  });

  test("should render item properly", () => {
    const { getByTestId } = renderBox();

    const item = getByTestId(infoBoxTestIds.infoBoxItem);
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent("itemLabel");
    expect(item).toHaveTextContent("itemValue");
  });

  test("should render link item properly", async () => {
    const { getByTestId } = renderBox();

    const item = getByTestId(infoBoxTestIds.infoBoxLinkItem);
    const link = getByTestId(infoBoxTestIds.infoBoxLink);

    expect(item).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(item).toHaveTextContent("linkItemLabel");
    expect(item).toHaveTextContent("linkItemLabel");
  });
});
