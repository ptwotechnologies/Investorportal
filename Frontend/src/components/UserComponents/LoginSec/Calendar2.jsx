import React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

const Calendar2 = ({ onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null); // default null
  const [month, setMonth] = React.useState(new Date());
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="Founded on"
          className="bg-background pr-10 p-3 py-6 text-[#00103280] font-semibold"
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(newDate)) {
              setDate(newDate);
              setMonth(newDate);
              if (onChange) onChange(newDate); // call onChange prop
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setValue(formatDate(selectedDate));
                setOpen(false);
                if (onChange) onChange(selectedDate); // call onChange prop
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Calendar2;
