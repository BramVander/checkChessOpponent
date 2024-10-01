import { MonthPicker, MonthInput } from "react-lite-month-picker";

function Calendar({ openCal, selectMonth, monthData, isOpen }) {
  return (
    <>
      <div>
        <MonthInput
          size={"small"}
          selected={monthData}
          setShowMonthPicker={openCal}
          showMonthPicker={isOpen}
          bgColor={"#fafafa"}
        />
        {isOpen ? (
          <MonthPicker
            size={"small"}
            setIsOpen={openCal}
            selected={monthData}
            onChange={selectMonth}
            bgColorPicker={"#fafafa"}
          />
        ) : null}
      </div>
    </>
  );
}

export default Calendar;
