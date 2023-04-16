import React from "react";

const ReadOnlyRow = ({breakdown, handleEditClick}) => {
  return (
    <tr>
    <td>{breakdown.breakdownRef}</td>
    <td>{breakdown.companyName}</td>
    <td>{breakdown.driverName}</td>
    <td>{breakdown.regNum}</td>
    <td>{breakdown.breakdownDate}</td>
    <td>
        <button type="button" onClick={(event) => handleEditClick(event, breakdown)} style={{
    backgroundColor: "blue",
    borderRadius: "5px",
    color: "white",
    width:60,
    height:30
  }}>Edit</button>
    </td>
  </tr>
  );
};

export default ReadOnlyRow;