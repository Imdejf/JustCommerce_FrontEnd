import { Story, Meta } from "@storybook/react";
import InfoBox from "./InfoBox";
import Badge, { BagdeVariant } from "../../bagdes/Badge";
import Button from "../../buttons/basicButton/Button";

import Placeholder from "../../../../assets/images/placeholder.png";

export default {
  title: "Boxs/InfoBox",
  component: InfoBox,
  args: {},
} as Meta;

export const FullDataExample: Story = () => (
  <InfoBox>
    <InfoBox.Image src={Placeholder} />

    <InfoBox.Items>
      <InfoBox.InfoItem label="Tytuł" value="ThatGuyTheaN" />
      <InfoBox.InfoItem label="testLabel" value="TestValue" />
      <InfoBox.InfoItem label="testLabel" value="TestValue" />
      <InfoBox.InfoItem label="testLabel" value="TestValue" />

      <InfoBox.LinkItem
        label="YouTube ID"
        href="#"
        value="1nbtHQk1Zj7LITVqL6J0RW"
      />
      <InfoBox.LinkItem label="testLabel" href="#" value="TestValue" />
      <InfoBox.LinkItem label="testLabel" href="#" value="TestValue" />
      <InfoBox.LinkItem label="testLabel" href="#" value="TestValue" />

      <InfoBox.InfoItem label="testLabel" value="TestValue" />
      <InfoBox.InfoItem label="testLabel" value="TestValue" />
      <InfoBox.InfoItem label="testLabel" value="TestValue" />
      <InfoBox.InfoItem label="testLabel" value="TestValue" />
    </InfoBox.Items>
    <div className="flex md:flex-col md:w-32 md:justify-end gap-1">
      <Button className="flex-1 md:flex-grow-0 mb-auto">Edytuj</Button>
      <div className="flex md:flex-col flex-grow md:flex-grow-0 gap-1">
        <Badge>Muzyka</Badge>
        <Badge>Audio</Badge>
        <Badge>Single</Badge>
        <Badge variant={BagdeVariant.Success}>W uzytku</Badge>
      </div>
    </div>
  </InfoBox>
);

export const Image: Story = () => <InfoBox.Image src={Placeholder} />;

export const Item: Story = () => (
  <InfoBox.InfoItem label="Label" value="Value" />
);

export const LinkItem: Story = () => (
  <InfoBox.LinkItem label="Label" value="Value" href="#" />
);

export const ItemList: Story = ({ ItemsCount }) => (
  <InfoBox.Items>
    {Array.from({ length: ItemsCount }).map((idx) => (
      <InfoBox.InfoItem label="Label" value="Value" />
    ))}
  </InfoBox.Items>
);

ItemList.args = {
  ItemsCount: 4,
};
