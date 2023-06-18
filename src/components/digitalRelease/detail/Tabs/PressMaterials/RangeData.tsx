import React, { useState } from "react";
import styled from "styled-components";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";

function RangeData({ filterHandler }: any) {
  const [fil, setFil] = useState([]);
  const changeData = (val: any) => {
    //@ts-ignore
    setFil((prev) => {
      if (prev) {
        let obj = [...prev, val];
        const fil = filterFun(obj);
        return [...fil];
      }
    });
  };
  const filterFun = (arr: any) => {
    return arr
      .filter(
        (value: any, index: any, self: any) =>
          index === self.findLastIndex((t: any) => t.name === value.name)
      )
      .filter((t: any) => t.value !== "");
  };
  return (
    <div className=" text-sm w-full" style={{ maxHeight: "150px" }}>
      <div
        style={{ maxWidth: "300px" }}
        className="px-18 py-12 bg-white-dirty   rounded-t-sm"
      >
        <span style={{ color: "rgba(0,0,0", opacity: 0.7 }}>
          Wprowadź zakres dat
        </span>
      </div>
      <div style={{ maxWidth: "800px" }} className="max-h-96 overflow-y-auto">
        <div className="grid grid-cols-3 bg-white bg-opacity-30 ">
          <DateContainer>
            <DataInput
              type="date"
              onChange={(e) => {
                changeData({ name: "from", value: e.target.value });
              }}
            />
            <DataLabel>od</DataLabel>
          </DateContainer>
          <DateContainer>
            <DataInput
              type="date"
              onChange={(e) => {
                changeData({ name: "to", value: e.target.value });
              }}
            />
            <DataLabel>do</DataLabel>
          </DateContainer>
          <div
            style={{ padding: "24px 0" }}
            className=" flex justify-center   rounded-t-sm"
          >
            <Button
              variant={ButtonVariant.Submit}
              onClick={() => {
                filterHandler(fil);
              }}
            >
              Filtruj
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RangeData;

const DateContainer = styled.div`
  min-height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid rgba(90, 90, 100, 0.3);
  border-radius: 14px;
  max-width: 250px;
  margin: 20px 15px;
`;
const DataLabel = styled.label`
  position: absolute;

  left: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #000;
  font-size: 1rem;
`;

const DataInput = styled.input`
  background-color: transparent;
  padding: 0 30px 0 60px;
  font-size: 1rem;
`;
