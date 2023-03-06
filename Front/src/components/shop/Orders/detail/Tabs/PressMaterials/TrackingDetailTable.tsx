import { OrderInterface } from "types/userTypes";
import { useState } from "react";
import orderServices from "../../../../../../services/orderServices";
import { toast } from "react-toastify";
import copyIcon from "../../../../../../assets/icons/copyIcon.svg";
import { showServerErrors } from "utils/errorsUtils";

interface IDetailTableProps {
  label?: string;
  order?: OrderInterface;
  items: Array<{
    label: string;
    value: string;
  }>;
}

const TrackingDetailTable: React.FC<IDetailTableProps> = ({
  label,
  items,
  order,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isEddited, toggleEddited] = useState(false);
  const [trackingNumer, setTrackingNumer] = useState("");
  const [trackingLink, setTrackingLink] = useState("");

  const handleTrackingNumerHandle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTrackingNumer(e.target.value);
  };

  const handleTrackingLinkHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingLink(e.target.value);
  };

  const editTrackingNumer = async () => {
    if (order) {
      if (!trackingNumer)
        return toast.error("Numer trackingu nie może być pusty!");
      try {
        await orderServices.editTrackingNumber(
          order?.Id,
          trackingNumer,
          trackingLink,
        );
        toast.success("Edytowano numer trackingu!");
        window.location.reload();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  return (
    <div className="w-full text-sm">
      <div
        className="px-18 py-12 bg-white opacity-80 rounded-t-sm"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span className="opacity-70">{label}</span>

        {order && order.Address.TrackingNumer?.TrackingNumer && (
          <span
            className="opacity-70"
            style={{ cursor: "pointer", color: "rgb(17, 99, 240)" }}
            onClick={() => toggleEddited((prev) => !prev)}
          >
            Edytuj
          </span>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {order && order.Address.TrackingNumer?.TrackingNumer && !isEddited && (
          <div className={`grid grid-cols-2 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{"Nr trackingu"}</span>
            </div>

            <div className="bg-white bg-opacity-30 p-12 text-center">
              {order.Address.TrackingNumer.Link ? (
                <div style={{ position: "relative" }}>
                  <a
                    href={order.Address.TrackingNumer.Link}
                    rel="noreferrer"
                    target="_blank"
                    className="opacity-70 cursor-pointer text-blue"
                  >
                    {order.Address.TrackingNumer.TrackingNumer}
                  </a>

                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      position: "absolute",
                      top: "0",
                      right: "10px",
                      cursor: "pointer",
                    }}
                    src={copyIcon}
                    alt="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        order.Address.TrackingNumer.Link,
                      );
                      toast.info("Skopiowano link do trackingu!");
                    }}
                  />
                </div>
              ) : (
                <span className="opacity-70 cursor-pointer">
                  {order.Address.TrackingNumer.TrackingNumer}
                </span>
              )}
            </div>
          </div>
        )}

        {order && !order.Address.TrackingNumer?.TrackingNumer && !isAdded && (
          <>
            <div className={`grid grid-cols-2 gap-1 my-1`}>
              <div className="bg-white bg-opacity-30 p-12 text-center">
                <span className="opacity-70">{"Nr trackingu"}</span>
              </div>

              <div className="bg-white bg-opacity-30 p-12 text-center">
                <span
                  onClick={() => setIsAdded(true)}
                  className="opacity-70 cursor-pointer text-blue"
                >
                  {"DODAJ"}
                </span>
              </div>
            </div>
          </>
        )}

        {isEddited && (
          <>
            <div className={`grid grid-cols-2 gap-1 my-1`}>
              <div className="bg-white bg-opacity-70 p-12 text-center">
                <span className="opacity-70">{"Nr trackingu"}</span>
              </div>

              <div className="bg-white bg-opacity-70 p-12 text-center">
                <input
                  type="text"
                  value={trackingNumer}
                  onChange={handleTrackingNumerHandle}
                />
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-1 my-1`}>
              <div className="bg-white bg-opacity-70 p-12 text-center">
                <span className="opacity-70">{"Link trackingu"}</span>
              </div>

              <div className="bg-white bg-opacity-70 p-12 text-center">
                <input
                  type="text"
                  value={trackingLink}
                  onChange={handleTrackingLinkHandle}
                />
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-1 my-1`}>
              <div className="bg-white bg-opacity-70 p-12 text-center">
                <span className="opacity-70">{""}</span>
              </div>

              <div className="bg-white bg-opacity-70 p-12 text-center">
                <span
                  onClick={() => {
                    editTrackingNumer();
                    setIsAdded(false);
                  }}
                  className="opacity-70 cursor-pointer text-blue"
                >
                  {"ZAPISZ"}
                </span>
              </div>
            </div>
          </>
        )}

        {order &&
          !order.Address.TrackingNumer?.TrackingNumer &&
          isAdded &&
          !isEddited && (
            <>
              <div className={`grid grid-cols-2 gap-1 my-1`}>
                <div className="bg-white bg-opacity-70 p-12 text-center">
                  <span className="opacity-70">{"Nr trackingu"}</span>
                </div>

                <div className="bg-white bg-opacity-70 p-12 text-center">
                  <input
                    type="text"
                    value={trackingNumer}
                    onChange={handleTrackingNumerHandle}
                  />
                </div>
              </div>

              <div className={`grid grid-cols-2 gap-1 my-1`}>
                <div className="bg-white bg-opacity-70 p-12 text-center">
                  <span className="opacity-70">{"Link trackingu"}</span>
                </div>

                <div className="bg-white bg-opacity-70 p-12 text-center">
                  <input
                    type="text"
                    value={trackingLink}
                    onChange={handleTrackingLinkHandle}
                  />
                </div>
              </div>

              <div className={`grid grid-cols-2 gap-1 my-1`}>
                <div className="bg-white bg-opacity-70 p-12 text-center">
                  <span className="opacity-70">{""}</span>
                </div>

                <div className="bg-white bg-opacity-70 p-12 text-center">
                  <span
                    onClick={() => {
                      editTrackingNumer();
                      setIsAdded(false);
                    }}
                    className="opacity-70 cursor-pointer text-blue"
                  >
                    {"ZAPISZ"}
                  </span>
                </div>
              </div>
            </>
          )}

        {items.map((item) => (
          <div className={`grid grid-cols-2 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.label}</span>
            </div>

            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingDetailTable;
