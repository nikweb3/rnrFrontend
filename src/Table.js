import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable, useSortBy, useFilters } from "react-table";

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://azureapiservice.azurewebsites.net/api/breakdown/getbreakdowns")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      Header: "Breakdown Ref",
      accessor: "breakdownRef",
    },
    {
      Header: "Company Name",
      accessor: "companyName",
    },
    {
      Header: "Driver Name",
      accessor: "driverName",
    },
    {
      Header: "Registration Number",
      accessor: "regNum",
    },
    {
      Header: "Breakdown Date",
      accessor: "breakdownDate",
    },
  ];

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? "sort-desc"
                      : "sort-asc"
                    : ""
                }
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;