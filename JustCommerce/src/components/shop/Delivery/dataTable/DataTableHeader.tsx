import { ReactNode, useState } from "react";
import { ReactComponent as Arrow } from "../../../../assets/icons/sortArrow.svg";

type DataTableHeaderProps = {
  headers: Array<ReactNode>;
};

const DataTableHeader: React.FC<DataTableHeaderProps> = ({ headers }) => {
  const [activeMock, setActiveMock] = useState(`${headers[0]}_up`);

  return (
    <thead>
      <tr>
        {headers.map((header, idx) => (
          <th key={idx}>
            <div className="flex items-center justify-center px-30 relative">
              <span className="text-sm font-regular opacity-70">{header}</span>
              <span className="flex gap-x-1 absolute right-0">
                <Arrow
                  onClick={() => setActiveMock(`${header}__down`)}
                  className={`opacity-50 hover:opacity-80 cursor-pointer ${
                    activeMock === `${header}__down` ? "text-blue" : ""
                  }`}
                />
                <Arrow
                  onClick={() => setActiveMock(`${header}__up`)}
                  className={` transform rotate-180  opacity-50 hover:opacity-80 cursor-pointer ${
                    activeMock === `${header}__up` ? "text-blue" : ""
                  }`}
                />
              </span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DataTableHeader;
