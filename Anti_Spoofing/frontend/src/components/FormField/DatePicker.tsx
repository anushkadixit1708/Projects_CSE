import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({
  value,
  setValue,
  className = "",
  disabled = false,
}: {
  value: any;
  setValue: (v: Date) => void;
  className?: string;
  disabled?: boolean;
}) => {
  const val = value ? new Date(value) : new Date();
  if (!value) {
    setValue(val);
  }
  return (
    <ReactDatePicker
      disabled={disabled}
      className={className}
      selected={val}
      onChange={(date) => {
        setValue(date as Date);
      }}
    />
  );
};

export default DatePicker;
