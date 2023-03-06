import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SelectStatystics from "components/common/inputs/select/SelectStatystics";

const arr = [
  "Data zamówienia",
  "Numer zamówienia",
  "Ilość sztuk na zamówienie",
];
const sorts = [
  {
    label: "Data zamówienia (Najnowsze)",
    value: 0,
  },
  {
    label: "Data zamówienia (Najstarsze)",
    value: 1,
  },
  {
    label: "Numer zamówienia (A-Z)",
    value: 2,
  },
  {
    label: "Numer zamówienia (Z-A)",
    value: 3,
  },
  {
    label: "Ilość sztuk (Najwiecej)",
    value: 4,
  },
  {
    label: "Ilość sztuk (Najmniej)",
    value: 5,
  },
];

function RaportOrders({ orders }: any) {
  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);

  useEffect(() => {
    if (sortBy?.value === 0) {
      const sorted = orders
        .slice(0)
        .sort((a: any, b: any) =>
          b.OrderCreated > a.OrderCreated
            ? 1
            : b.OrderCreated < a.OrderCreated
            ? -1
            : 0
        );
      setSortedOrders(sorted);
    }
    if (sortBy?.value === 1) {
      const sorted = orders
        .slice(0)
        .sort((a: any, b: any) =>
          a.OrderCreated > b.OrderCreated
            ? 1
            : a.OrderCreated < b.OrderCreated
            ? -1
            : 0
        );
      setSortedOrders(sorted);
    }

    if (sortBy?.value === 3) {
      const sorted = orders
        .slice(0)
        .sort((a: any, b: any) =>
          b.OrderNumber > a.OrderNumber
            ? 1
            : b.OrderNumber < a.OrderNumber
            ? -1
            : 0
        );
      setSortedOrders(sorted);
    }
    if (sortBy?.value === 2) {
      const sorted = orders
        .slice(0)
        .sort((a: any, b: any) =>
          a.OrderNumber > b.OrderNumber
            ? 1
            : a.OrderNumber < b.OrderNumber
            ? -1
            : 0
        );
      setSortedOrders(sorted);
    }

    if (sortBy?.value === 5) {
      const sorted = orders
        .slice(0)
        .sort((a: any, b: any) => a.Amount - b.Amount);
      setSortedOrders(sorted);
    }
    if (sortBy?.value === 4) {
      const sorted = orders
        .slice(0)
        .sort((a: any, b: any) => b.Amount - a.Amount);
      setSortedOrders(sorted);
    }
  }, [sortBy, orders]);

  return (
    <>
      <div className=" text-sm w-full" style={{ marginTop: "20px" }}>
        <div className="px-18 py-12 bg-white-dirty  rounded-t-sm flex justify-between">
          <div>
            <span style={{ color: "rgba(0,0,0", opacity: 0.7 }}>
              Towar na zamówieniach:
            </span>
          </div>

          <SelectStatystics
            name="Sort"
            items={sorts}
            label="Sortowanie"
            selectedItem={sortBy}
            setSelectedItem={setSortBy}
            defaultValue={0}
          />
        </div>
      </div>

      <table
        className="table"
        cellSpacing={12}
        cellPadding={10}
        style={{ minWidth: "800px" }}
      >
        <thead>
          <tr>
            {arr.map((header, idx) => (
              <th key={idx}>
                <div className="flex items-center justify-center px-30 relative">
                  <span className="text-sm font-regular opacity-70">
                    {header}
                  </span>
                  <span className="flex gap-x-1 absolute right-0"></span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((row: any, index: any) => {
            const data = row.OrderCreated;
            const dataFormat = data?.substring(0, 10);
            return (
              <tr key={index}>
                <td>{dataFormat}</td>

                <td>
                  <Link to={`/shop/orders/detail/${row.OrderId}?tab=products`}>
                    {row.OrderNumber}
                  </Link>
                </td>
                <td>{row.Amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default RaportOrders;
