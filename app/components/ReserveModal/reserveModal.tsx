import React, { useState } from "react";
import InfoForm from "./infoForm";
import Calendar from "./calendar";
import TimeSlots from "./timeSlots";
import CategorySelection from "./categorySelection";

const ReserveModal = ({ closeModal }: { closeModal: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0); // مرحله فعلی (0: فرم اطلاعات، 1: تقویم، 2: ساعت، 3: دسته‌بندی)

  const steps = [
    { label: "Info Form", component: <InfoForm /> },
    { label: "Calendar", component: <Calendar /> },
    { label: "Select Time", component: <TimeSlots /> },
    { label: "Photography Category", component: <CategorySelection /> },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "600px",
          position: "relative", // برای ضربدر در گوشه
        }}
      >
        {/* دکمه بستن */}
        <button
          onClick={closeModal} // فراخوانی تابع برای بستن مودال
          className="absolute top-4 right-4 text-zinc-700 text-3xl
            hover:text-white hover:bg-rose-500 hover:shadow-lg hover:rounded-full
            hover:scale-110 hover:rotate-90 transition-all duration-300 ease-in-out p-2 z-30"
        >
          &times;
        </button>

        <h2>{steps[currentStep].label}</h2>
        {steps[currentStep].component}

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* دکمه قبلی */}
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              style={{
                padding: "10px 20px",
                backgroundColor: "#FF0000",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Previous
            </button>
          )}

          {/* دکمه بعدی */}
          {currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReserveModal;
