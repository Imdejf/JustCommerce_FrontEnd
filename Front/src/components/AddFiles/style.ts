import styled from "styled-components";

export const Container = styled.div`
  height: 92%;
  width: 100%;
  /* background: white; */
  padding: 30px;
  overflow: auto;

  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    border-top: 2px solid #e3e8e9;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.05em;

    thead > tr > th {
      padding: 15px 10px;
      font-size: 16px;
      font-weight: 300;
      letter-spacing: 0.05em;
    }

    td {
      border-top: 2px solid #e3e8e9;
      padding: 15px 10px;
    }

    td,
    th {
      padding: 15px 10px;
    }

    thead > tr > th:nth-of-type(1),
    tbody > tr > td:nth-of-type(1) {
      width: calc(40% - 100px - 75px - 35px);
    }

    thead > tr > th:nth-of-type(2),
    tbody > tr > td:nth-of-type(2) {
      width: calc(60% - 100px - 75px - 35px);
    }

    thead > tr > th:nth-of-type(3),
    tbody > tr > td:nth-of-type(3) {
      width: 100px;
    }

    thead > tr > th:nth-of-type(4),
    tbody > tr > td:nth-of-type(4) {
      width: 75px;
      color: #4f90ff;
      font-weight: 500;
      cursor: pointer;
    }

    thead > tr > th:nth-of-type(5),
    tbody > tr > td:nth-of-type(5) {
      width: 35px;
      cursor: pointer;
      padding-top: 20px;
    }
  }
`;
