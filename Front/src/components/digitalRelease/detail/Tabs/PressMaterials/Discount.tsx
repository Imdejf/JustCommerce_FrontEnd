import React, { useEffect, useState } from "react";
import SaveIco from "assets/icons/save.svg";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import productServices from "services/productServices";
import { useParams } from "react-router";
import styled from "styled-components";
import { toast } from "react-toastify";

function Discount({ label, product, refreshProduct }: any) {
  const { id } = useParams<{ id: string }>();
  const [isEdited, setIsEdited] = useState(false);
  const [combinations, setCombinations] = useState([]);
  const [selectedCombination, setSelectedCombination] = useState();
  const [selectedIdCombination, setSelectedIdCombination] = useState("");
  const [discount, setDiscount] =
    useState<{
      DiscountId: string;
      Netto: number;
      Tax: number;
      Sale: number;
      Finished: string;
      Started: string;
      Status: number | undefined | null;
    }>();

  const [netto, setNetto] = useState(0);
  const [tax, setTax] = useState(0);
  const [gross, setGross] = useState();
  const [discountVal, setDiscountVal] = useState(0);
  const [brutto, setBrutto] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const saveData = async () => {
    if (
      !selectedCombination &&
      startDate === "" &&
      endDate === "" &&
      !netto &&
      !tax &&
      !gross &&
      !brutto
    )
      return toast.error("Uzupełnij dane !");

    if (discount && selectedCombination) {
      setDiscountVal(0);
      try {
        await productServices.editDiscount(
          discount.DiscountId,
          selectedIdCombination,
          netto,
          tax,
          +discountVal,
          startDate,
          endDate,
        );
        setIsEdited(false);
      } catch (errors: any) {
        console.error(errors);
      }
    }
    if (!discount && selectedCombination) {
      try {
        await productServices.addDiscount(
          selectedIdCombination,
          netto,
          tax,
          +discountVal,
          startDate,
          endDate,
        );
        toast.success("Dodano!");
        refreshProduct();
        setIsEdited(false);
      } catch (errors: any) {
        console.error(errors);
      }
      setIsEdited(false);
    }
  };

  const deleteDiscount = async () => {
    if (!discount) {
      return toast.error("??");
    }
    try {
      await productServices.deleteDiscount(discount.DiscountId);
      toast.success("Usunięto promocje!");
      refreshProduct();
      setIsEdited(false);
      setDiscount(undefined);
    } catch (errors: any) {
      console.error(errors);
    }
  };

  const getCombinations = async () => {
    const response = await productServices.getCombinations(id);
    // @ts-ignore
    setCombinations(response);
  };

  useEffect(() => {
    productServices
      .getProductDiscountByCombinationId(selectedIdCombination)
      .then((item: any) => {
        if (item) {
          setDiscount({
            DiscountId: item.DiscountId,
            Netto: item.Netto,
            Tax: item.Tax,
            Sale: item.Sale,
            Finished: item.Finished,
            Started: item.Started,
            Status: item.Status,
          });
        }
      });
  }, [selectedIdCombination, isEdited]);

  useEffect(() => {
    getCombinations();
  }, []);

  useEffect(() => {
    let cenaBrutto;
    if (netto && tax) {
      const canaZpodatkiem = (+netto * +tax) / 100 + +netto;
      cenaBrutto = (canaZpodatkiem - canaZpodatkiem * (+discountVal / 100))
        .toFixed(2)
        .replace(".", ",");
      setBrutto(cenaBrutto);
    } else {
      setBrutto("");
    }
  }, [netto, tax, discountVal]);

  useEffect(() => {
    if (discount) {
      const { Netto, Tax, Sale, Finished, Started } = discount;
      setNetto(Netto);
      setTax(Tax);
      setDiscountVal(Sale);
      setEndDate(Finished);
      setStartDate(Started);
    } else {
    }
  }, [discount]);

  const handleCombinationChange = (e: any) => {
    const filteredCombination = product.Combinations.filter(
      (combination: any) => combination.CombinationId === e.target.value,
    );
    if (filteredCombination.Discount == null) {
      const { Netto, Tax, Gross, Discount } = filteredCombination[0];
      setNetto(Netto);
      setTax(Tax);
      setGross(Gross);
      setDiscount(Discount);
    } else {
    }
    setSelectedCombination(filteredCombination);
    setSelectedIdCombination(filteredCombination[0].CombinationId);
  };

  const startDateHandler = (e: any) => {
    setStartDate(e.target.value);
  };
  const endDateHandler = (e: any) => {
    setEndDate(e.target.value);
  };
  const handleDiscountChange = (e: any) => {
    setDiscountVal(e.target.value);
  };

  const onEditHandler = () => {
    setIsEdited(true);
    setDiscountVal(0);
  };
  return (
    <div className="w-full text-sm">
      <div
        className="px-18 py-12 bg-white opacity-80 rounded-t-sm"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span className="opacity-70">{label}</span>
        {isEdited && !discount ? (
          <div style={{ display: "flex", gap: "15px" }}>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => saveData()}
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
        ) : isEdited && discount ? (
          <div style={{ display: "flex", gap: "15px" }}>
            <button
              className="button button--abort py-4 px-18"
              onClick={deleteDiscount}
            >
              Usuń
            </button>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => saveData()}
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
        ) : !isEdited && selectedCombination ? (
          <div style={{ display: "flex" }}>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => onEditHandler()}
              src={EditIco}
              alt="edit"
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="max-h-120 overflow-y-auto">
        <div className={`grid grid-cols-2 gap-1 my-1`}>
          <div className="bg-white bg-opacity-30  p-12 text-center">
            <span className="opacity-70">Kombinacja</span>
          </div>
          <div className="bg-white bg-opacity-30  p-12 text-center">
            <select
              name=""
              id=""
              onChange={handleCombinationChange}
              style={{ background: "rgba(255,255,255,0.5)", maxWidth: "100%" }}
            >
              <option selected hidden disabled>
                Wybierz kombinacje
              </option>

              {combinations &&
                combinations.map((combination) => {
                  const { Name, CombinationId } = combination;

                  return <option value={CombinationId}>{Name}</option>;
                })}
            </select>
          </div>
        </div>
        {isEdited && !discount ? (
          <>
            <div className={`grid grid-cols-2 gap-1 my-1`}>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Data Rozpoczęcia</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">
                  <input type="date" onChange={startDateHandler} />
                </span>
              </div>

              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Data Zakończenia</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">
                  <input type="date" onChange={endDateHandler} />
                </span>
              </div>

              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Cena netto</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">{netto}</span>
              </div>

              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Podatek</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">{tax}%</span>
              </div>

              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Przecena</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center flex justify-center">
                <InputContainer>
                  <Input
                    type="text"
                    onChange={handleDiscountChange}
                    value={discountVal}
                  />

                  <Percent>%</Percent>
                </InputContainer>
              </div>

              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Cena Brutto</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">{brutto}</span>
              </div>
            </div>
          </>
        ) : !isEdited && !discount && selectedCombination ? (
          <>
            <div className={`grid grid-cols-2 gap-1 my-1`}>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Cena netto</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">{netto}</span>
              </div>

              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Podatek</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">{tax}%</span>
              </div>

              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Cena brutto</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">{gross}</span>
              </div>

              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">Przecena</span>
              </div>
              <div className="bg-white bg-opacity-30  p-12 text-center">
                <span className="opacity-70">
                  {discount === null ? "-" : "-"}
                </span>
              </div>
            </div>
          </>
        ) : !isEdited && discount ? (
          <div className={`grid grid-cols-2 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Data Rozpoczęcia</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{startDate.substring(10, -1)}</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Data Zakończenia</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{endDate.substring(10, -1)}</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Cena netto</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{netto}</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Podatek</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{tax}%</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Obniżka</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{discountVal}%</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Cena brutto</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{brutto}</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Status</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">
                {discount.Status === 0
                  ? "Aktywny"
                  : discount.Status === 1
                  ? "Nieaktywny"
                  : "Zaplanowany"}
              </span>
            </div>
          </div>
        ) : isEdited && discount ? (
          <div className={`grid grid-cols-2 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Data Rozpoczęcia</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">
                <input
                  type="date"
                  value={startDate.substring(10, -1)}
                  onChange={startDateHandler}
                />
              </span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Data Zakończenia</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">
                <input
                  type="date"
                  value={endDate.substring(10, -1)}
                  onChange={endDateHandler}
                />
              </span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Cena netto</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{netto}</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Podatek</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{tax}%</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Obniżka</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center flex justify-center">
              <InputContainer>
                <Input
                  type="text"
                  onChange={handleDiscountChange}
                  value={discountVal}
                />

                <Percent>%</Percent>
              </InputContainer>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Cena brutto</span>
            </div>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">{brutto}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Discount;

const InputContainer = styled.div`
  opacity: 0.7;
  max-width: 50px;
  position: relative;
`;
const Input = styled.input``;
const Percent = styled.p`
  position: absolute;
  top: 0;
  right: 0;
`;
