import { ReactNode, useState } from "react";
import { ReactComponent as Arrow } from "../../../assets/icons/sortArrow.svg";

type DataTableHeaderProps = {
  headers: { name: string; average: string }[];
};

const HomeDataTableHeader: React.FC<DataTableHeaderProps> = ({ headers }) => {
  const [activeMock, setActiveMock] = useState(`${headers[0]}_up`);

  return (
    <thead>
      <tr>
        {headers.map((header, idx) => {
          return (
            <th colSpan={idx === 3 ? 3 : 1} key={idx}>
              <div
                className="px-30 relative"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ fontSize: "12px" }}
                  className="text-sm font-regular opacity-70"
                >
                  {header.name}
                </span>

                {header.average && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "black",
                      opacity: "100%",
                    }}
                    className="text-sm font-regular opacity-70"
                  >
                    {header.average}
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default HomeDataTableHeader;
