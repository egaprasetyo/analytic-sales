import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const DateFilter = ({
  value,
  onChange,
}: {
  value: DateValueType;
  onChange: (newDate: DateValueType) => void;
}) => {
  return (
    <Datepicker
      inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      primaryColor={"blue"}
      value={value}
      onChange={onChange}
      showShortcuts={false}
      separator={"to"}
    />
  );
};

export default DateFilter;
