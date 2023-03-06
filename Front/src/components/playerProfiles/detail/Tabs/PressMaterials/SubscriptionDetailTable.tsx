import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import playerProfileServices from "services/playerProfileServices";

interface IDetailTableProps {
  addNewSubscription: any;
  removeSubscription: any;
  isAdded: boolean;
  setIsAdded: any;
  label?: string;
  items: Array<{
    label: string;
    value: string;
    value2?: string;
    id: string;
  }>;
}

const SubscriptionDetailTable: React.FC<IDetailTableProps> = ({
  removeSubscription,
  addNewSubscription,
  label,
  items,
  isAdded,
  setIsAdded,
}) => {
  const { id } = useParams<{ id: string }>();

  let date = new Date(
    items[0] && items[0].value.slice(0, 10).split(".").reverse().join("."),
  );
  date.setDate(date.getDate() + 1);

  const [isEdited, setIsEdited] = useState(false);
  const [fromDate, setFromDate] = useState(
    items[0] ? date.toISOString().slice(0, 10) : "",
  );
  const [toDate, setToDate] = useState("");

  const fromDateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const toDateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  return (
    <div className="w-full text-sm">
      <div
        className="px-18 py-12 bg-white opacity-80 rounded-t-sm"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span className="opacity-70">{label}</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <span
            className="opacity-70"
            style={{ color: "blue", cursor: "pointer", userSelect: "none" }}
            onClick={() => setIsAdded((prev: boolean) => !prev)}
          >
            {isAdded ? "Anuluj" : "Dodaj"}
          </span>
          <span
            className="opacity-70"
            style={{ color: "blue", cursor: "pointer", userSelect: "none" }}
            onClick={() => setIsEdited((prev) => !prev)}
          >
            Edytuj
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className={`grid grid-cols-4 gap-1 my-1`}>
          <div className="bg-white bg-opacity-70 p-12 text-center">
            <span className="opacity-70">Od</span>
          </div>

          <div className="bg-white bg-opacity-70 p-12 text-center">
            <span className="opacity-70">Do</span>
          </div>
          <div className="bg-white bg-opacity-70 p-12 text-center">
            <span className="opacity-70">Pracownik</span>
          </div>
          <div className="bg-white bg-opacity-70 p-12 text-center">
            <span className="opacity-70">Zmiana parametrów</span>
          </div>
        </div>

        {isAdded && (
          <>
            <div className={`grid grid-cols-4 gap-1 my-1`}>
              <div className="bg-white bg-opacity-70 p-12 text-center">
                {items[0] ? (
                  <p>
                    {fromDate
                      .split("-")
                      .reverse()
                      .join("-")
                      .replaceAll("-", ".")}
                  </p>
                ) : (
                  <input
                    className="opacity-70"
                    type="date"
                    value={fromDate}
                    onChange={fromDateOnChange}
                  />
                )}
              </div>

              <div className="bg-white bg-opacity-70 p-12 text-center">
                <input
                  type="date"
                  className="opacity-70"
                  value={toDate}
                  onChange={toDateOnChange}
                />
              </div>
              <div className="bg-white bg-opacity-70 p-12 text-center">
                <span className="opacity-70">-</span>
              </div>

              <div className="bg-white bg-opacity-70 p-12 text-center">
                <span
                  className="opacity-70 text-green cursor-pointer"
                  style={{ fontSize: "20px" }}
                  onClick={() => addNewSubscription(id, fromDate, toDate)}
                >
                  +
                </span>
              </div>
            </div>
          </>
        )}

        {items.map((item) => (
          <div className={`grid grid-cols-4 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.label.slice(0, 10)}</span>
            </div>

            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.value.slice(0, 10)}</span>
            </div>
            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.value2}</span>
            </div>
            <div className="bg-white bg-opacity-30 p-12 text-center">
              {isEdited && (
                <span
                  className="opacity-70 text-red cursor-pointer"
                  style={{ fontSize: "16px" }}
                  onClick={() => removeSubscription(item.id)}
                >
                  X
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionDetailTable;
