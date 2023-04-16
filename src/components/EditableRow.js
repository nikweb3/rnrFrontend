import React from "react";

const EditableRow = ({editFormData, handleEditFormChange}) => {

    const displayFormData = (event) => {
        event.preventDefault();
        console.log(editFormData);
      }

      const handleUpdate = () => {
        fetch('https://azureapiservice.azurewebsites.net/api/breakdown/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editFormData)
        })
        .then(response => {
          if (response.ok) {
            window.location.reload();
          }
        })
        .catch(error => console.error(error));
      }

  return (
    <tr>
        <td>
        <input
          type="text"
          required="required"
          placeholder="Enter breakdown reference"
          name="breakdownRef"
          value={editFormData.breakdownRef}
          onChange={handleEditFormChange}
        ></input>
        </td>
        <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a companyName"
          name="companyName"
          value={editFormData.companyName}
          onChange={handleEditFormChange}
        ></input>
        </td>
        <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a driverName"
          name="driverName"
          value={editFormData.driverName}
          onChange={handleEditFormChange}
        ></input>
        </td>
        <td>
        <input
          type="text"
          required="required"
          placeholder="Enter reg number"
          name="regNum"
          value={editFormData.regNum}
          onChange={handleEditFormChange}
        ></input>
        </td>
        <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a breakdownDate"
          name="breakdownDate"
          value={editFormData.breakdownDate}
          onChange={handleEditFormChange}
        ></input>
        </td>
        <td>
            <button onClick={handleUpdate} style={{
            backgroundColor: "green",
            borderRadius: "5px",
            color: "white",
            width:60,
            height:30
            }}>Save</button>
        </td>
    </tr>
   );
};

export default EditableRow;