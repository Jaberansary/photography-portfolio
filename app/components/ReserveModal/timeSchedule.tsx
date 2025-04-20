import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const fullyBookedDates = [new Date("2025-04-26"), new Date("2025-04-28")];

const reservedTimeSlots: { [key: string]: string[] } = {
  "2025-04-25": ["09:00 - 11:00", "12:00 - 14:00"],
};

const allTimeSlots = ["09:00 - 11:00", "12:00 - 14:00", "16:00 - 18:00"];

type TimeScheduleProps = {
  onSelect: (date: Date, timeSlot: string) => void;
  initialDate?: Date | null;
  initialSlot?: string | null;
};

const TimeSchedule: React.FC<TimeScheduleProps> = ({
  onSelect,
  initialDate = null,
  initialSlot = null,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(initialSlot);

  useEffect(() => {
    setSelectedDate(initialDate);
    setSelectedSlot(initialSlot);
  }, [initialDate, initialSlot]);

  const isFullyBooked = (date: Date) => {
    return fullyBookedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  const filterValidDates = (date: Date) => {
    const now = new Date();
    return date >= now && !isFullyBooked(date);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleTimeSlotClick = (slot: string) => {
    if (disabledSlots.includes(slot)) return;
    setSelectedSlot(slot);
    if (selectedDate) {
      onSelect(selectedDate, slot);
    }
  };

  const getDisabledSlots = (date: Date | null) => {
    if (!date) return [];
    const key = date.toLocaleDateString("sv-SE");
    return reservedTimeSlots[key] || [];
  };

  const disabledSlots = getDisabledSlots(selectedDate);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select a Day:
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={filterValidDates}
          minDate={new Date()}
          placeholderText="Choose a day"
          dateFormat="MMMM d, yyyy"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          dayClassName={(date) => {
            const isFully = isFullyBooked(date);
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            if (isFully) return "fully-booked-day";
            if (isSelected) return "selected-day";
            return "";
          }}
        />
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Time Slot:
          </label>
          <div className="flex gap-2 flex-wrap">
            {allTimeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleTimeSlotClick(slot)}
                disabled={disabledSlots.includes(slot)}
                className={`px-4 py-2 rounded-md border text-sm transition
                  ${
                    selectedSlot === slot
                      ? "bg-sky-400 text-white"
                      : disabledSlots.includes(slot)
                      ? "text-red-500 cursor-not-allowed border-red-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-sky-100"
                  }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSchedule;
