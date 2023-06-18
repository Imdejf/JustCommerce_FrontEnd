import React from "react";
import DropDownLabel from "./DropDownLabel";

function CategoryiesPanel({ groups }: any) {
  return (
    <div>
      <DropDownLabel label="Licencja" items={groups.Licence} />
      <DropDownLabel label="Usługa" items={groups.Service} />
      <DropDownLabel label="Produkt" items={groups.Product} />
    </div>
  );
}

export default CategoryiesPanel;
