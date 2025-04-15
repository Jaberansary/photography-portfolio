import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// نمونه‌ی استاتیک از روزهایی که بازه‌های زمانی‌شون پر شده
const fullyBookedDates = [new Date("2025-04-16"), new Date("2025-04-18")];

// نمونه‌ی استاتیک از بازه‌های زمانی که برای یک روز خاص رزرو شدن
const reservedTimeSlots: { [key: string]: string[] } = {
  "2025-04-17": ["09:00 - 11:00", "12:00 - 14:00"], // فقط بازه 4 تا 6 بازه
};

const allTimeSlots = ["09:00 - 11:00", "12:00 - 14:00", "16:00 - 18:00"];

const TimeSchedule: React.FC<{
  onSelect: (date: Date, timeSlot: string) => void;
}> = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

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
    setSelectedSlot(null); // ریست کردن بازه قبلی
  };

  const handleTimeSlotClick = (slot: string) => {
    if (disabledSlots.includes(slot)) return; // جلوش رو همینجا می‌گیریم
    setSelectedSlot(slot);
    if (selectedDate) {
      onSelect(selectedDate, slot);
    }
  };

  const getDisabledSlots = (date: Date | null) => {
    if (!date) return [];
    const key = date.toLocaleDateString("sv-SE"); // یعنی '2025-04-17'
    return reservedTimeSlots[key] || [];
  };

  const disabledSlots = getDisabledSlots(selectedDate);

  console.log("disabledSlots", disabledSlots);

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
            const isFully = isFullyBooked(date); // بررسی اینکه روز پر است
            const isSelected =
              selectedDate?.toDateString() === date.toDateString(); // بررسی روز انتخابی

            if (isFully) return "fully-booked-day"; // روزهایی که پر هستند
            if (isSelected) return "selected-day"; // روز انتخابی

            return ""; // سایر روزها به حالت پیش‌فرض
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
