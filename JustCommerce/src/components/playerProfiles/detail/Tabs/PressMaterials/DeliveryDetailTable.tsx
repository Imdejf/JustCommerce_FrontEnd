import { IDigitalRelease, Product, Delivery } from "types/digitalReleaseTypes";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";

interface IDetailTableProps {
  label?: string;
  items: Array<{
    label: string;
    value: string;
    value2?: string;
    value3?: string;
    Id: string;
  }>;
  cols: {
    label: string;
    value: string;
    value2?: string;
    value3?: string;
  };
  product: Product;
  revokeDelivery: (deliveryId: string) => void;
  showNewDeliveries: boolean;
  toggleShowNewDeliveres: React.Dispatch<React.SetStateAction<boolean>>;
  deliveries: any;
  grantDelivery: (deliveryId: string) => void;
}

const DeliveryDetailTable: React.FC<IDetailTableProps> = ({
  label,
  items,
  cols,
  showNewDeliveries,
  toggleShowNewDeliveres,
  revokeDelivery,
  deliveries,
  grantDelivery,
  product,
}) => {
  return (
    <div className="w-full text-sm">
      <div className="px-18 flex justify-between py-8 bg-white opacity-80 rounded-t-sm">
        <span className="opacity-70">{/* {label} */}</span>
        <Button
          onClick={() => toggleShowNewDeliveres((prev) => !prev)}
          // disabled={!permissions.Edit}
          variant={ButtonVariant.Submit}
        >
          Dodaj atrybut
        </Button>
      </div>

      {showNewDeliveries && deliveries.length > 0 && (
        <>
          <div className={`grid relative grid-cols-4 gap-1 my-1`}>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">{cols.label}</span>
            </div>

            <>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.value2}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.value3}</span>
              </div>
            </>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">{cols.value}</span>
            </div>
          </div>
        </>
      )}

      {showNewDeliveries &&
        deliveries.map((delivery: any) => {
          const { Deadline, Id, Gross, Description, Name } = delivery;

          if (
            product.Deliveries.filter(
              (delivery: any) => delivery.DeliveryId === Id
            ).length > 0
          )
            return;

          return (
            <>
              <div className={`grid relative grid-cols-4 gap-1 my-1`}>
                <div className="bg-white bg-opacity-80 p-12 text-center">
                  <span className="opacity-70">{Name}</span>
                </div>

                <>
                  <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{Description}</span>
                  </div>
                  <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">
                      {" "}
                      {Deadline === "0" ? "natychmiast" : `${Deadline}H`}
                    </span>
                  </div>
                </>

                <div className="bg-white bg-opacity-80 p-12 text-center">
                  <span className="opacity-70">{Gross}</span>
                  <span
                    onClick={() => grantDelivery(Id)}
                    className={`absolute right-7  text-xl  leading-none top-50% text-green cursor-pointer`}
                  >
                    +
                  </span>
                </div>
              </div>
            </>
          );
        })}

      <div className="max-h-96 overflow-y-auto">
        {items.length > 0 && !showNewDeliveries && (
          <>
            <div
              className={`grid ${
                cols.value2 && cols.value3 ? "grid-cols-4" : "grid-cols-2"
              } gap-1 my-1`}
            >
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.label}</span>
              </div>
              {cols.value2 && cols.value3 && (
                <>
                  <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{cols.value2}</span>
                  </div>
                  <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{cols.value3}</span>
                  </div>
                </>
              )}

              <div className="bg-white bg-opacity-80 p-12 text-center">
                {cols.value === "checkbox" ? (
                  <input
                    style={{ width: "20px", height: "20px" }}
                    type="checkbox"
                  />
                ) : (
                  <span className="opacity-70">{cols.value}</span>
                )}
              </div>
            </div>
          </>
        )}

        {items.map((item) => (
          <div
            className={`grid relative ${
              item.value2 && item.value3 ? "grid-cols-4" : "grid-cols-2"
            } gap-1 my-1`}
          >
            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.label}</span>
            </div>
            {item.value2 && item.value3 && (
              <>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{item.value2}</span>
                </div>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">
                    {item.value3 === "0" ? "natychmiast" : `${item.value3}H`}
                  </span>
                </div>
              </>
            )}

            <div className="bg-white bg-opacity-30 p-12 text-center">
              {item.value === "checkbox" ? (
                <input
                  style={{ width: "20px", height: "20px" }}
                  type="checkbox"
                />
              ) : (
                <>
                  <span className="opacity-70">{item.value}</span>
                  <span
                    onClick={() => revokeDelivery(item.Id)}
                    className={`absolute right-7 top-50% text-red cursor-pointer`}
                  >
                    X
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDetailTable;
