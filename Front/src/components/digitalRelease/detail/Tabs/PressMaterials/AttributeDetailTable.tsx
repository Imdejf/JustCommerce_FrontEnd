import { Product, AttributeValue, Attribute } from "types/digitalReleaseTypes";
import { useState, useEffect } from "react";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import { toast } from "react-toastify";
import styled from "styled-components";

const GridColumn = styled.div<{ cols: number }>`
  display: grid;
  position: relative;
  gap: 1px;
  margin: 1px 0;
  grid-template-columns: ${(props) => `repeat(${props.cols}, minmax(0, 1fr))`};
`;

interface IDetailTableProps {
  label?: string;
  product: Product;
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
    Netto: number,
    Tax: number,
    Amount: number,
    Period: number,
    attributesArray: any,
  ) => void;
  editCombination: (
    ProductId: string,
    CategoryId: string,
    CombinationId: string,
    EAN: string,
    Netto: number,
    Tax: number,
    Amount: number,
    Period: number,
    array: any,
  ) => void;
}

const AttributeDetailTable: React.FC<IDetailTableProps> = ({
  label,
  product,
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

  const [netto, setNetto] = useState(0);
  const [editedNetto, setEditedNetto] = useState(0);

  const [tax, setTax] = useState(0);
  const [period, setPeriod] = useState("");

  const [editedTax, setEditedTax] = useState(0);
  const [editedPeriod, setEditedPeriod] = useState("");

  const [attributesId, setAttributesId] = useState({});

  const [editedEAN, setEditedEAN] = useState("");
  const [editedAmount, setEditedAmount] = useState<number>(0);
  const [editedAttributesId, setEditedAttributesId] = useState<{
    any?: string;
  }>({});

  const handleNettoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNetto(+e.target.value);
  };

  const handleEditedNettoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNetto(+e.target.value);
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTax(+e.target.value);
  };

  const handleEditedTaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedTax(+e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  const handleEANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEAN(e.target.value);
  };

  const handleAttributesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (product.Type === 3) {
      const words = e.target.value.split(",");
      setPeriod(
        words[1].substring(
          words[1].indexOf("(") + 1,
          words[1].lastIndexOf(")"),
        ),
      );
      setAttributesId((prev) => ({ ...prev, [e.target.name]: words[0] }));
    } else {
      setAttributesId((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleEditedAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAmount(+e.target.value);
  };

  const handleEditedEANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEAN(e.target.value);
  };

  const handleEditedAttributesChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (product.Type === 3) {
      const words = e.target.value.split(",");
      setEditedPeriod(
        words[1].substring(
          words[1].indexOf("(") + 1,
          words[1].lastIndexOf(")"),
        ),
      );
      setEditedAttributesId((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } else {
      setEditedAttributesId((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const cols = {
    amount: "ZAPAS W MAGAZYNIE",
    EAN: "EAN",
    netto: "Cena",
    tax: "VAT",
  };

  useEffect(() => {
    if (editedItemId) {
      const filteredItem = product.Combinations.filter(
        (singleCombination: any) =>
          singleCombination.CombinationId === editedItemId,
      );

      const { EAN, Amount, Values, Netto, Tax } = filteredItem[0];
      setEditedAmount(+Amount);
      setEditedEAN(EAN);
      setEditedNetto(Netto);
      setEditedTax(Tax);

      Values.map((singleValue: any) => {
        const { AttributeName, ValueId, AttributeId, Value } = singleValue;
        if (product.Type === 3) {
          setEditedPeriod(
            Value.substring(Value.indexOf("(") + 1, Value.lastIndexOf(")")),
          );
          setEditedAttributesId((prev) => ({
            ...prev,
            [AttributeName]: `${ValueId},${Value}`,
            [`${AttributeName}Id`]: AttributeId,
          }));
        } else {
          setEditedAttributesId((prev) => ({
            ...prev,
            [AttributeName]: ValueId,
            [`${AttributeName}Id`]: AttributeId,
          }));
        }
      });
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
          <GridColumn cols={5 + attributes.length}>
            {attributes.map((singleAttribute: any) => {
              return (
                <div className="bg-white bg-opacity-80 p-12 text-center">
                  <span className="opacity-70">{singleAttribute.Name}</span>
                </div>
              );
            })}

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">{cols.EAN}</span>
            </div>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">{cols.amount}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">{cols.netto}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">{cols.tax}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">Zmiana parametrów</span>
            </div>
          </GridColumn>
        </>
      )}

      {showNewCombinations && attributes.length > 0 && (
        <>
          <GridColumn cols={5 + attributes.length}>
            {attributes.map((singleAttribute: any) => {
              return (
                <div className="bg-white bg-opacity-80 p-12 text-center">
                  <span className="opacity-70">
                    <select
                      style={{ background: "#efefef" }}
                      name={singleAttribute.Name}
                      id=""
                      onChange={handleAttributesChange}
                    >
                      <option value="" disabled hidden selected>
                        {singleAttribute.Name}
                      </option>
                      {singleAttribute.Values.map(
                        (attribute: AttributeValue) => {
                          const { Name, ValueId } = attribute;
                          if (product.Type === 3) {
                            return (
                              <option value={`${ValueId},${Name}`}>
                                {Name}
                              </option>
                            );
                          } else {
                            return <option value={ValueId}>{Name}</option>;
                          }
                        },
                      )}
                    </select>
                  </span>
                </div>
              );
            })}

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <input
                style={{ background: "rgba(0,0,0,0.04)" }}
                type="text"
                value={EAN}
                onChange={handleEANChange}
              />
            </div>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <input
                style={{ background: "rgba(0,0,0,0.04)", width: "60%" }}
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <input
                style={{ background: "rgba(0,0,0,0.04)" }}
                type="text"
                value={netto}
                onChange={handleNettoChange}
              />
            </div>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <select value={tax} onChange={handleTaxChange}>
                <option value="23">23%</option>
                <option value="8">8%</option>
                <option value="0">0%</option>
              </select>
            </div>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span
                onClick={() => {
                  if (!EAN || !amount) {
                    toast.error("Uzupełnij dane!");
                  } else {
                    // @ts-ignore
                    let attributesArray = [];
                    attributes.forEach((element: any, i: number) => {
                      attributesArray.push({
                        AttributeId: element.AttributeId,
                        // @ts-ignore
                        Value: attributesId[element.Name],
                      });
                    });

                    addCombination(
                      product.ProductId,
                      product.CategoryId,
                      EAN,
                      netto,
                      +tax,
                      amount,
                      +period,
                      // @ts-ignore
                      attributesArray,
                    );
                    setEAN("");
                    setAmount(0);
                    setNetto(0);
                    setTax(0);
                    setPeriod("");
                  }
                }}
                className={`  text-xl  leading-none  text-green cursor-pointer`}
              >
                +
              </span>
            </div>
          </GridColumn>
        </>
      )}

      <div className="max-h-96 overflow-y-auto">
        {!showNewCombinations && (
          <>
            <GridColumn cols={5 + attributes.length}>
              {attributes.map((singleAttribute: any) => {
                return (
                  <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{singleAttribute.Name}</span>
                  </div>
                );
              })}

              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.EAN}</span>
              </div>

              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.amount}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.netto}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">{cols.tax}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span className="opacity-70">Zmiana parametrów</span>
              </div>
            </GridColumn>
          </>
        )}

        {product.Combinations.map((singleCombination: any) => {
          if (singleCombination.CombinationId === editedItemId) {
            return (
              <GridColumn cols={5 + attributes.length}>
                {singleCombination.Values.map(
                  (singleValue: any, index: any) => {
                    return (
                      <div className="bg-white bg-opacity-30 p-12 text-center">
                        <select
                          name={singleValue.AttributeName}
                          id=""
                          // @ts-ignore
                          value={editedAttributesId[singleValue.AttributeName]}
                          // value={""}
                          style={{ background: "#efefef" }}
                          onChange={handleEditedAttributesChange}
                        >
                          {attributes[index].Values.map(
                            (attribute: AttributeValue) => {
                              const { Name, ValueId } = attribute;

                              if (product.Type === 3) {
                                return (
                                  <option value={`${ValueId},${Name}`}>
                                    {Name}
                                  </option>
                                );
                              } else {
                                return <option value={ValueId}>{Name}</option>;
                              }
                            },
                          )}
                        </select>
                      </div>
                    );
                  },
                )}

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

                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <input
                    style={{ background: "rgba(0,0,0,0.04)" }}
                    type="text"
                    value={editedNetto}
                    onChange={handleEditedNettoChange}
                  />
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <select value={editedTax} onChange={handleEditedTaxChange}>
                    <option value="23">23%</option>
                    <option value="8">8%</option>
                    <option value="0">0%</option>
                  </select>
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
                        let editedAttributesArray: {
                          Value: string;
                          AttributeId: string;
                        }[] = [];
                        attributes.forEach((element: any, i: number) => {
                          editedAttributesArray.push({
                            AttributeId: element.AttributeId,
                            //  @ts-ignore
                            Value: editedAttributesId[element.Name],
                          });
                        });

                        console.log(editedAttributesArray);
                        editCombination(
                          product.ProductId,
                          product.CategoryId,
                          singleCombination.CombinationId,
                          editedEAN,
                          editedNetto,
                          editedTax,
                          editedAmount,
                          +editedPeriod,
                          product.Type === 3
                            ? [
                                {
                                  ...editedAttributesArray[0],
                                  Value:
                                    editedAttributesArray[0].Value.split(
                                      ",",
                                    )[0],
                                },
                              ]
                            : editedAttributesArray,
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
              </GridColumn>
            );
          } else
            return (
              <GridColumn cols={5 + attributes.length}>
                {singleCombination.Values.map((singleValue: any) => {
                  return (
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                      <span className="opacity-70">{singleValue.Value}</span>
                    </div>
                  );
                })}

                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{singleCombination.EAN}</span>
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center relative">
                  <span className="opacity-70">{singleCombination.Amount}</span>
                </div>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{`${singleCombination.Netto.toFixed(
                    2,
                  ).replace(".", ",")}`}</span>
                </div>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{`${singleCombination.Tax}%`}</span>
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
                        onClick={() =>
                          setEditedItemId(singleCombination.CombinationId)
                        }
                        alt="edit"
                        style={{
                          width: "18px",
                          height: "18px",

                          cursor: "pointer",
                        }}
                      />
                      <span
                        onClick={() =>
                          deleteCombination(singleCombination.CombinationId)
                        }
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
              </GridColumn>
            );
        })}
      </div>
    </div>
  );
};

export default AttributeDetailTable;
