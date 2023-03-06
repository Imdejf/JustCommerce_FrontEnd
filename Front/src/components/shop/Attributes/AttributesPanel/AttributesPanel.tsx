import React from "react";
import DropDownLabel from "./DropDownLabel";

function AttributesPanel({ groups }: any) {
  return (
    <div>
      <DropDownLabel label="Kolor" items={groups[0]} />
      <DropDownLabel label="Rozmiar" items={groups[1]} />
      <DropDownLabel label="Licence" items={groups[2]} />
      <DropDownLabel label="Okres" items={groups[3]} />
    </div>
  );
}

export default AttributesPanel;
