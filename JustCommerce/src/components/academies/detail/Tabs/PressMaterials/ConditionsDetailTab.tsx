import React, { useState } from "react";
import AddIco from "assets/icons/add-circle.svg";
import SaveIco from "assets/icons/save.svg";
import EditIco from "assets/icons/edit.svg";
import DeleteIco from "assets/icons/delete.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import productServices from "services/productServices";
import { toast } from "react-toastify";
import { showServerErrors } from "utils/errorsUtils";

interface IDetailTableProps {
  label?: string;
  product: any;
  refreshProduct: any;
  items: Array<{
    label: string;
    value: string;
  }>;
}

const ConditionsDetailTab: React.FC<IDetailTableProps> = ({
  label,
  items,
  product,
  refreshProduct,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [netto, setNetto] = useState(+items[2].value);
  const [tax, setTax] = useState(items[1].value);

  const updatePrice = async () => {
    try {
      await productServices.updatePrice(product.ProductId, netto, +tax);
      toast.success("Zmieniono cene!");
      refreshProduct();
      setIsEdited(false);
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNetto(+e.target.value);
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTax(e.target.value);
  };

  return (
    <div className="w-full text-sm">
      <div
        className="px-18 py-12 bg-white opacity-80 rounded-t-sm"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span className="opacity-70">{label}</span>
        {isEdited ? (
          <div style={{ display: "flex", gap: "15px" }}>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => updatePrice()}
              src={SaveIco}
              alt="save"
            />
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setIsEdited(false)}
              src={CancelIco}
              alt="cancel"
            />
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setIsEdited(true)}
              src={EditIco}
              alt="edit"
            />
          </div>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {items.map((item, index) => {
          if (isEdited)
            return (
              <div className={`grid grid-cols-2 gap-1 my-1`}>
                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">{item.label}</span>
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center">
                  {index === 2 ? (
                    <input
                      type="number"
                      onChange={handleChange}
                      value={netto}
                    />
                  ) : index === 1 ? (
                    <select value={tax} onChange={handleTaxChange}>
                      <option value="23">23%</option>
                      <option value="8">8%</option>
                      <option value="0">0%</option>
                    </select>
                  ) : index === 0 ? (
                    // @ts-ignore
                    <span className="opacity-70">
                      {(+netto * +tax) / 100 + +netto}
                    </span>
                  ) : (
                    <span className="opacity-70">{item.value}</span>
                  )}
                </div>
              </div>
            );
          else {
            return (
              <div className={`grid grid-cols-2 gap-1 my-1`}>
                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">{item.label}</span>
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center">
                  {index === 1 ? (
                    <span className="opacity-70">{item.value}%</span>
                  ) : (
                    <span className="opacity-70">{item.value}</span>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ConditionsDetailTab;
