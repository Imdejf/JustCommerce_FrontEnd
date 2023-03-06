import React, { useEffect, useState } from "react";
import AddIco from "assets/icons/add-circle.svg";
import SaveIco from "assets/icons/save.svg";
import EditIco from "assets/icons/edit.svg";
import DeleteIco from "assets/icons/delete.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import productServices from "services/productServices";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { showServerErrors } from "utils/errorsUtils";

interface IDetailTableProps {
  label?: string;
  product: any;
  refreshProduct: any;
}

const ConditionsDetailTab: React.FC<IDetailTableProps> = ({
  label,
  product,
  refreshProduct,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isEdited, setIsEdited] = useState(false);
  const [netto, setNetto] = useState(0);
  const [tax, setTax] = useState("");
  const [gross, setGross] = useState(0);
  const [combinations, setCombinations] = useState([]);
  const [selectedCombination, setSelectedCombination] = useState("");

  const updatePrice = async () => {
    if (!selectedCombination) return toast.error("Wybierz kombinacje!");
    try {
      await productServices.updatePrice(selectedCombination, netto, +tax);
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

  const getCombinations = async () => {
    const response = await productServices.getCombinations(id);
    // @ts-ignore
    setCombinations(response);
  };

  useEffect(() => {
    getCombinations();
  }, []);

  useEffect(() => {
    if (selectedCombination) {
      const filteredCombination = product.Combinations.filter(
        (combination: any) => combination.CombinationId === selectedCombination,
      );
      console.log(filteredCombination[0]);
      const { Netto, Tax, Gross } = filteredCombination[0];
      setNetto(Netto);
      setTax(Tax);
      setGross(Gross);
    }
  }, [selectedCombination]);

  const handleCombinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCombination(e.target.value);
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
        {isEdited ? (
          <div className={`grid grid-cols-2 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Kombinacja</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <select
                name=""
                id=""
                onChange={handleCombinationChange}
                style={{ background: "rgba(255,255,255,0.5)" }}
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

            {selectedCombination && (
              <>
                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">Netto</span>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <input type="number" onChange={handleChange} value={netto} />
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">Tax</span>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <select value={tax} onChange={handleTaxChange}>
                    <option value="23">23%</option>
                    <option value="8">8%</option>
                    <option value="0">0%</option>
                  </select>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">Brutto</span>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">
                    {new Intl.NumberFormat("fr-CA", {
                      minimumFractionDigits: 2,
                    }).format((+netto * +tax) / 100 + +netto)}
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={`grid grid-cols-2 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30  p-12 text-center">
              <span className="opacity-70">Kombinacja</span>
            </div>

            <div className="bg-white bg-opacity-30  p-12 text-center">
              <select
                name=""
                id=""
                onChange={handleCombinationChange}
                style={{ background: "rgba(255,255,255,0.5)" }}
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

            {selectedCombination && (
              <>
                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">Netto</span>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">
                    {new Intl.NumberFormat("fr-CA", {
                      minimumFractionDigits: 2,
                    }).format(netto)}
                  </span>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">Tax</span>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">{tax}</span>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">Brutto</span>
                </div>

                <div className="bg-white bg-opacity-30  p-12 text-center">
                  <span className="opacity-70">
                    {new Intl.NumberFormat("fr-CA", {
                      minimumFractionDigits: 2,
                    }).format((+netto * +tax) / 100 + +netto)}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConditionsDetailTab;
