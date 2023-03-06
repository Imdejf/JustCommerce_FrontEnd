import DropDownRaport from "./DropDownRaport";

function SalesStatement({ raportCombinations, raportRefundes }: any) {
  const sumOfAmount = raportCombinations.reduce((sum: number, object: any) => {
    return sum + object.Amount;
  }, 0);

  const sumOfBrutto = raportCombinations.reduce((sum: number, object: any) => {
    return sum + object.TotalPrice;
  }, 0);

  const sumOfVatNetto = raportCombinations.reduce(
    (sum: number, object: any) => {
      return sum + object.Netto;
    },
    0
  );

  const sumOfRefndesAmount = raportRefundes.reduce(
    (sum: number, object: any) => {
      return sum + object.Amount;
    },
    0
  );

  const sumOfRefndesTotalPrice = raportRefundes.reduce(
    (sum: number, object: any) => {
      return sum + object.TotalPrice;
    },
    0
  );

  const sumOfRefndesNetto = raportRefundes.reduce(
    (sum: number, object: any) => {
      return sum + object.Netto;
    },
    0
  );
  function numberWithSpaces(x: number) {
    const fixed = x.toFixed(2);
    var parts = fixed.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const num = parts.join(".");
    return num.replace(".", ",");
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <DropDownRaport label="Zestawienie sprzedaży">
        <>
          <div className={`grid relative grid-cols-4 gap-2 my-2  w-full  `}>
            <div className="bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">Nazwa</span>
            </div>
            <div className="bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">Ilość sprzedanych sztuk</span>
            </div>

            <div className=" bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">Brutto</span>
            </div>
            <div className=" bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">Wartość sprzedaży brutto</span>
            </div>
          </div>
          {raportCombinations?.map((item: any, idx: any) => {
            return (
              <div
                key={idx}
                className={`grid relative grid-cols-4 gap-2 my-2  w-full  `}
              >
                <div className="bg-opacity-20 p-12 text-center bg-white">
                  <span className="opacity-70">
                    {item.Name} {item.EAN}
                  </span>
                </div>
                <div className="bg-opacity-20 p-12 text-center bg-white">
                  <span className="opacity-70">{item.Amount}</span>
                </div>
                <div className="bg-opacity-20 p-12 text-center bg-white">
                  <span className="opacity-70">
                    {numberWithSpaces(item.Netto)}
                  </span>
                </div>
                <div className="bg-opacity-20 p-12 text-center bg-white">
                  <span className="opacity-70">
                    {numberWithSpaces(item.TotalPrice)}
                  </span>
                </div>
              </div>
            );
          })}
          {/* //Podsumowanie1 */}
          <div className={`grid relative grid-cols-4 gap-2 my-2  w-full  `}>
            <div className="bg-opacity-50 p-12 text-center bg-white col-span-3">
              <span className="opacity-70">Podsumowanie</span>
            </div>
            <div className="bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">
                {numberWithSpaces(sumOfBrutto)}
              </span>
            </div>
          </div>

          {/* // Zwrot 2*/}
          <div className={`grid relative grid-cols-4 gap-2 my-2  w-full  `}>
            <div className="bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">Nazwa</span>
            </div>
            <div className="bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">Ilość zwróconych sztuk</span>
            </div>
            <div className=" bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">Wartość zwróconych sztuk</span>
            </div>
            <div className=" bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">Wartość zwrotów brutto</span>
            </div>
          </div>

          {/* //Data Zwrot*/}
          {raportRefundes.map((item: any, idx: any) => (
            <div
              key={idx}
              className={`grid relative grid-cols-4 gap-2 my-2  w-full  `}
            >
              <div className="bg-opacity-20 p-12 text-center bg-white">
                <span className="opacity-70">{item.Name}</span>
              </div>
              <div className="bg-opacity-20 p-12 text-center bg-white">
                <span className="opacity-70">
                  {numberWithSpaces(item.Amount)}
                </span>
              </div>
              <div className="bg-opacity-20 p-12 text-center bg-white">
                <span className="opacity-70">
                  {numberWithSpaces(item.Netto)}
                </span>
              </div>
              <div className="bg-opacity-20 p-12 text-center bg-white">
                <span className="opacity-70">
                  {/* {currencyFormat.format(item.TotalPrice)} */}
                  {numberWithSpaces(item.TotalPrice)}
                </span>
              </div>
            </div>
          ))}

          {/* // Podsumowanie 2*/}
          <div
            className={`grid relative grid-cols-4 grid-rows-2  gap-2 my-2  w-full  `}
          >
            <div className="bg-opacity-50 p-12 text-center bg-white col-span-3">
              <span className="opacity-70">Podsumowanie</span>
            </div>
            <div className="bg-opacity-50 p-12 text-center bg-white">
              <span className="opacity-70">
                {numberWithSpaces(sumOfRefndesTotalPrice)}
              </span>
            </div>
          </div>
        </>
      </DropDownRaport>
    </div>
  );
}

export default SalesStatement;
