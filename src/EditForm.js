import React from "react";

function PopupModel({ onClose, onSave, currentRow }) {
  return (
    <div className="popup">
      <div className="popup_inner">
        {currentRow && (
          <div>
            <h2>Edit Breakdown</h2>
            <form>
              <label>Ref:</label>
              <input type="text" defaultValue={currentRow.breakdownRef} />
              <br />
              <label>Company:</label>
              <input type="text" defaultValue={currentRow.companyName} />
              <br />
              <label>Driver:</label>
              <input type="text" defaultValue={currentRow.driverName} />
              <br />
              <label>Reg. No.:</label>
              <input type="text" defaultValue={currentRow.regNum} />
              <br />
              <label>Date:</label>
              <input
                type="datetime-local"
                defaultValue={currentRow.breakdownDate}
              />
              <br />
              <button onClick={onSave}>Save</button>
              <button onClick={onClose}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopupModel;