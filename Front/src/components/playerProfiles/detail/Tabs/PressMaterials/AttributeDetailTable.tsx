import { Product, AttributeValue, Attribute } from "types/digitalReleaseTypes";
import { useState, useEffect } from "react";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import { toast } from "react-toastify";

interface IDetailTableProps {
  label?: string;
  product: Product;
  items: Array<{
    color: string;
    amount: string;
    size: string;
    EAN: string;
    id: string;
    colorId: string;
    sizeId: string;
  }>;
  cols: {
    color: string;
    amount: string;
    size: string;
    EAN: string;
  };
  deleteCombination: (id: string) => void;
  toggleShowNewCombinations: React.Dispatch<React.SetStateAction<boolean>>;
  showNewCombinations: boolean;
  editAttributes: boolean;
  toggleEditAttributes: React.Dispatch<React.SetStateAction<boolean>>;
  attributes: any;
  addCombination: (
    ProductId: string,
    CategoryId: string,
    EAN: string,
    Amount: number,
    ColorAttributeId: string,
    SizeAttributeId: string,
    ColorValueId: string,
    SizeValueId: string
  ) => void;
  editCombination: (
    ProductId: string,
    CategoryId: string,
    CombinationId: string,
    EAN: string,
    Amount: number,
    ColorAttributeId: string,
    SizeAttributeId: string,
    ColorValueId: string,
    SizeValueId: string
  ) => void;
}

const AttributeDetailTable: React.FC<IDetailTableProps> = ({
  label,
  items,
  product,
  cols,
  deleteCombination,
  toggleShowNewCombinations,
  showNewCombinations,
  attributes,
  addCombination,
  editCombination,
  editAttributes,
  toggleEditAttributes,
}) => {
  const [editedItemId, setEditedItemId] = useState("");

  const [EAN, setEAN] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [colorId, setColorId] = useState("");
  const [sizeId, setSizeId] = useState("");

  const [editedEAN, setEditedEAN] = useState("");
  const [editedAmount, setEditedAmount] = useState<number>(0);
  const [editedColorId, setEditedColorId] = useState("");
  const [editedSizeId, setEditedSizeId] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  const handleEANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEAN(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColorId(e.target.value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSizeId(e.target.value);
  };

  const handleEditedAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAmount(+e.target.value);
  };

  const handleEditedEANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEAN(e.target.value);
  };

  const handleEditedColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedColorId(e.target.value);
  };

  const handleEditedSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedSizeId(e.target.value);
  };

  useEffect(() => {
    if (editedItemId) {
      const filteredItem = items.filter((item) => item.id === editedItemId);

      const { EAN, amount, colorId, sizeId } = filteredItem[0];
      setEditedAmount(+amount);
      setEditedEAN(EAN);
      setEditedColorId(colorId);
      setEditedSizeId(sizeId);
    }
  }, [editedItemId]);

  return (
    <div className="w-full text-sm">
      <div className="px-18 flex justify-between py-8 bg-white opacity-80 rounded-t-sm">
        <span className="opacity-70">{/* {label} */}</span>
        <div style={{ display: "flex", gap: "25px" }}>
          <Button
            onClick={() => {
              toggleShowNewCombinations((prev) => !prev);
              toggleEditAttributes(false);
              setEditedItemId("");
            }}
            // disabled={!permissions.Edit}
            variant={ButtonVariant.Submit}
          >
            Dodaj atrybut
          </Button>

          <Button
            onClick={() => {
              toggleEditAttributes((prev) => !prev);
              toggleShowNewCombinations(false);
              setEditedItemId("");
            }}
            // disabled={!permissions.Edit}
            variant={ButtonVariant.Submit}
          >
            {editAttributes ? "Zapisz" : "Edytuj"}
          </Button>
        </div>
      </div>

      {showNewCombinations && (
        <>
          <div className={`grid relative grid-cols-5 gap-1 my-1`}>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">{cols.color}</span>
            </div>

            <>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.size}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.EAN}</span>
              </div>
            </>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">{cols.amount}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">Zmiana parametrów</span>
            </div>
          </div>
        </>
      )}

      {showNewCombinations && attributes.length > 0 && (
        <>
          <div className={`grid relative grid-cols-5 gap-1 my-1`}>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">
                <select
                  style={{ background: "#efefef" }}
                  name=""
                  id=""
                  onChange={handleColorChange}
                >
                  <option value="" disabled hidden selected>
                    Kolor
                  </option>
                  {attributes[1].Values.map((attribute: AttributeValue) => {
                    const { Name, ValueId } = attribute;
                    return <option value={ValueId}>{Name}</option>;
                  })}
                </select>
              </span>
            </div>

            <>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">
                  <select
                    name=""
                    id=""
                    onChange={handleSizeChange}
                    style={{ background: "#efefef" }}
                  >
                    <option value="" disabled hidden selected>
                      Rozmiar
                    </option>
                    {attributes[0].Values.map((attribute: AttributeValue) => {
                      const { Name, ValueId } = attribute;
                      return <option value={ValueId}>{Name}</option>;
                    })}
                  </select>
                </span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <input
                  style={{ background: "rgba(0,0,0,0.04)" }}
                  type="text"
                  value={EAN}
                  onChange={handleEANChange}
                />
              </div>
            </>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <input
                style={{ background: "rgba(0,0,0,0.04)", width: "60%" }}
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span
                onClick={() => {
                  if (!EAN || !amount || !colorId || !sizeId) {
                    toast.error("Uzupełnij dane!");
                  } else {
                    addCombination(
                      product.ProductId,
                      product.CategoryId,
                      EAN,
                      amount,
                      attributes[1].AttributeId,
                      attributes[0].AttributeId,
                      colorId,
                      sizeId
                    );
                    setEAN("");
                    setAmount(0);
                  }
                }}
                className={`  text-xl  leading-none  text-green cursor-pointer`}
              >
                +
              </span>
            </div>
          </div>
        </>
      )}

      <div className="max-h-96 overflow-y-auto">
        {items.length > 0 && !showNewCombinations && (
          <>
            <div className={`grid grid-cols-5 gap-1 my-1`}>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.color}</span>
              </div>

              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.size}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.EAN}</span>
              </div>

              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.amount}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">Zmiana parametrów</span>
              </div>
            </div>
          </>
        )}

        {items.map((item) => {
          if (item.id === editedItemId) {
            return (
              <div className={`grid grid-cols-5 gap-1 my-1`}>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <select
                    name=""
                    id=""
                    value={editedColorId}
                    style={{ background: "#efefef" }}
                    onChange={handleEditedColorChange}
                  >
                    {attributes[1].Values.map((attribute: AttributeValue) => {
                      const { Name, ValueId } = attribute;
                      return <option value={ValueId}>{Name}</option>;
                    })}
                  </select>
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <select
                    style={{ background: "#efefef" }}
                    name=""
                    id=""
                    value={editedSizeId}
                    onChange={handleEditedSizeChange}
                  >
                    {attributes[0].Values.map((attribute: AttributeValue) => {
                      const { Name, ValueId } = attribute;
                      return <option value={ValueId}>{Name}</option>;
                    })}
                  </select>
                </div>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <input
                    style={{ background: "rgba(0,0,0,0.04)" }}
                    type="text"
                    value={editedEAN}
                    onChange={handleEditedEANChange}
                  />
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center relative">
                  <input
                    style={{ background: "rgba(0,0,0,0.04)", width: "50%" }}
                    type="number"
                    value={editedAmount}
                    onChange={handleEditedAmountChange}
                  />
                </div>
                {editAttributes && (
                  <div
                    className="bg-white bg-opacity-30 p-12 text-center "
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "25px",
                    }}
                  >
                    <img
                      src={SaveIco}
                      onClick={() => {
                        editCombination(
                          product.ProductId,
                          product.CategoryId,
                          item.id,
                          editedEAN,
                          editedAmount,
                          attributes[1].AttributeId,
                          attributes[0].AttributeId,
                          editedColorId,
                          editedSizeId
                        );
                        setEditedItemId("");
                      }}
                      alt="save"
                      style={{
                        width: "18px",
                        height: "18px",

                        cursor: "pointer",
                      }}
                    />
                    <img
                      src={CancelIco}
                      onClick={() => setEditedItemId("")}
                      alt="cancel"
                      style={{
                        width: "18px",
                        height: "18px",

                        cursor: "pointer",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div className={`grid  grid-cols-5  gap-1 my-1`}>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{item.color}</span>
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{item.size}</span>
                </div>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{item.EAN}</span>
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center relative">
                  <span className="opacity-70">{item.amount}</span>
                </div>
                {editAttributes ? (
                  <div
                    className="bg-white bg-opacity-30 p-12 text-center "
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "25px",
                    }}
                  >
                    <>
                      <img
                        src={EditIco}
                        onClick={() => setEditedItemId(item.id)}
                        alt="edit"
                        style={{
                          width: "18px",
                          height: "18px",

                          cursor: "pointer",
                        }}
                      />
                      <span
                        onClick={() => deleteCombination(item.id)}
                        className={` text-red cursor-pointer`}
                        style={{ fontSize: "18px" }}
                      >
                        X
                      </span>
                    </>
                  </div>
                ) : (
                  <div className="bg-white bg-opacity-30 p-12 text-center">
                    <span className="opacity-70"></span>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AttributeDetailTable;
