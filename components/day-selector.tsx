import { Dispatch, SetStateAction } from "react";
import { FormDataType } from "./add-habit-dialog";
import { cn } from "@/lib/utils";

const DaySelector = ({
  value,
  setFormData,
  formData,
}: {
  value: string;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
}) => {
  const onClick = () => {
    if (formData.days.includes(value)) {
      setFormData({
        ...formData,
        days: formData.days.filter((val) => val !== value),
      });
    } else {
      setFormData({ ...formData, days: [...formData.days, value] });
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-2 rounded-md hover:cursor-pointer flex items-center justify-center",
        formData.days.includes(value)
          ? "bg-primary text-white border-transparent"
          : "bg-white border-primary text-primary"
      )}
    >
      <p>{value}</p>
    </div>
  );
};

export default DaySelector;
