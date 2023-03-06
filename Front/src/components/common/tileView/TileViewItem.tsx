import { MouseEvent } from "react";

import Placeholder from "assets/images/placeholder.svg";

interface Props {
  title: string;
  content: JSX.Element;
  img: string;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const TileViewItem = ({ content, img, title }: Props) => {
  return (
    <div className="flex flex-col rounded bg-opacity-50 bg-white py-12 px-18 text-sm leading-relaxed hover:bg-opacity-90 relative">
      <div className="text-base font-medium opacity-80 p-4">{title}</div>
      <div className="flex gap-x-2 py-4 px-12">
        <div
          className="flex flex-col flex-grow overflow-hidden whitespace-nowrap"
          style={{ maxWidth: "70%" }}
        >
          {content}
        </div>
        <div
          className="w-28 h-28 shadow-md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            src={img || Placeholder}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default TileViewItem;
