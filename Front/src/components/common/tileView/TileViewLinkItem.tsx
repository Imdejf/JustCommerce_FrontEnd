import { useHistory } from "react-router";

import TileViewItem from "./TileViewItem";

interface Props {
  content: JSX.Element;
  img: string;
  link: string;
  title: string;
}

const TileViewLinkItem = ({ link, ...tileProps }: Props) => {
  const { push } = useHistory();

  const handleClick = () => {
    push(link);
  };

  return <TileViewItem {...tileProps} onClick={handleClick} />;
};

export default TileViewLinkItem;
