import { useState } from "react";
import { MonthPicker, MonthInput } from "react-lite-month-picker";

import { useChess } from "../Context/ChessContext";

function DatePicker() {
  const date = new Date();
  let thisYear = date.getFullYear();
  let thisMonth = (date.getMonth() + 1).toString().padStart(2, "0");

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: thisMonth,
    year: thisYear,
  });

  const { fetchOpponents } = useChess();

  function handleClick(e) {
    e.preventDefault();

    const clickedYear = selectedMonthData.year;
    const clickedMonth = selectedMonthData.month.toString().padStart(2, "0");
    fetchOpponents(clickedYear, clickedMonth);
  }

  return (
    <>
      <div>
        <MonthInput
          size={"small"}
          selected={selectedMonthData}
          setShowMonthPicker={setIsPickerOpen}
          showMonthPicker={isPickerOpen}
        />
        {isPickerOpen ? (
          <MonthPicker
            size={"small"}
            setIsOpen={setIsPickerOpen}
            selected={selectedMonthData}
            onChange={setSelectedMonthData}
          />
        ) : null}

        <button className="btn-primary" onClick={handleClick}>
          Check opponents
        </button>
      </div>
    </>
  );
}

export default DatePicker;
