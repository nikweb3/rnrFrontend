import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

function App() {
  const [breakdowns, setBreakdowns] = useState([]);


  const [editBreakdownId, setBreakdownId] = useState(null);



  const [editFormData, setEditFormData] = useState({
    breakdownRef: "",
    companyName: "",
    driverName: "",
    regNum: "",
    breakdownDate: "",
  });

  const handleEditClick = (event, breakdown) => {
    event.preventDefault();
    setBreakdownId(breakdown.breakdownRef);

    const formValues = {
      breakdownRef: breakdown.breakdownRef,
      companyName: breakdown.companyName,
      driverName: breakdown.driverName,
      regNum: breakdown.regNum,
      breakdownDate: breakdown.breakdownDate,
    };

    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldname = event.target.getAttribute("name");
    const fielvalue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldname] = fielvalue;

    setEditFormData(newFormData);
  };

  // const handleEditFormSubmit = (event) => {
  //   event.preventDefault();

  //   const editedBreakdown = {
  //     breakdownRef: editFormData.breakdownRef,
  //     companyName: editFormData.companyName,
  //     driverName: editFormData.driverName,
  //     regNum: editFormData.regNum,
  //     breakdownDate: editFormData.breakdownDate,
  //   };

  //   console.log(editedBreakdown);
  // };

  const [newBreakdown, setNewBreakdown] = useState({
    companyName: "",
    driverName: "",
    regNum: "",
    breakdownDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBreakdown((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddBreakdown = () => {
    fetch("https://azureapiservice.azurewebsites.net/api/breakdown/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBreakdown),
    })
      .then((response) => response.json())
      .then((data) => {
        setBreakdowns([...breakdowns, data]);
        setNewBreakdown({
          breakdownRef: "",
          companyName: "",
          driverName: "",
          regNum: "",
          breakdownDate: "",
        });
      })
      .catch((error) => console.error(error))
      .finally(() => window.location.reload());
  };

  useEffect(() => {
    fetch(
      "https://azureapiservice.azurewebsites.net/api/breakdown/getbreakdowns"
    )
      .then((response) => response.json())
      .then((data) => setBreakdowns(data))
      .catch((error) => console.error(error));
  }, []);

  // const columns = [
  //   {
  //     name: "Ref",
  //     selector: "breakdownRef",
  //     sortable: true,
  //   },
  //   {
  //     name: "Company",
  //     selector: "companyName",
  //     sortable: true,
  //   },
  //   {
  //     name: "Driver",
  //     selector: "driverName",
  //     sortable: true,
  //   },
  //   {
  //     name: "Reg. No.",
  //     selector: "regNum",
  //     sortable: true,
  //   },
  //   {
  //     name: "Date",
  //     selector: "breakdownDate",
  //     sortable: true,
  //     format: (row) => new Date(row.breakdownDate).toLocaleString(),
  //   },
  //   {
  //     name: "Action",
  //     cell: (row) => (
  //       <Fragment>
  //         {editBreakdownId === row.breakdownRef ? (
  //           <EditableRow
  //             editFormData={editFormData}
  //             handleEditFormChange={handleEditFormChange}
  //           />
  //         ) : (
  //           <>
  //             <button onClick={() => handleEditClick(row)}>Edit</button>
  //           </>
  //         )}
  //       </Fragment>
  //     ),
  //     sortable: false
  //   }
  // ];

  return (
    <div className="app-container">
      <br/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          <input
            type="text"
            name="breakdownRef"
            value={newBreakdown.breakdownRef}
            onChange={handleInputChange}
            placeholder="Breakdown Reference"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              height: 30,
              borderRadius: 5,
              marginRight: 5,
            }}
          />
          <input
            type="text"
            name="companyName"
            value={newBreakdown.companyName}
            onChange={handleInputChange}
            placeholder="Company Name"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              height: 30,
              borderRadius: 5,
              marginRight: 5,
            }}
          />
          <input
            type="text"
            name="driverName"
            value={newBreakdown.driverName}
            onChange={handleInputChange}
            placeholder="Driver Name"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              height: 30,
              borderRadius: 5,
              marginRight: 5,
            }}
          />
          <input
            type="text"
            name="regNum"
            value={newBreakdown.regNum}
            onChange={handleInputChange}
            placeholder="Registration Number"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              height: 30,
              borderRadius: 5,
              marginRight: 5,
            }}
          />
          <input
            type="date"
            name="breakdownDate"
            value={newBreakdown.breakdownDate}
            onChange={handleInputChange}
            placeholder="Breakdown Date"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              height: 32,
              borderRadius: 5,
              marginRight: 5,
            }}
          />
          <button
            type="button"
            onClick={handleAddBreakdown}
            style={{
              backgroundColor: "green",
              borderRadius: "5px",
              color: "white",
              width:121,
              height:35
              }}
          >
            Add Breakdown
          </button>
        </form>
      </div>
      <form>
        <table>
          <thead>
            <tr>
              <th>Breakdown Reference</th>
              <th>company Name</th>
              <th>driver Name</th>
              <th>reg Num</th>
              <th>breakdown Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {breakdowns.map((breakdown) => (
              <Fragment>
                {editBreakdownId === breakdown.breakdownRef ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                  />
                ) : (
                  <ReadOnlyRow
                    breakdown={breakdown}
                    handleEditClick={handleEditClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default App;
