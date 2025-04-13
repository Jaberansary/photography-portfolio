import React, { useRef, useState } from "react";
import InfoForm, { InfoFormRef, FormData } from "./infoForm";
import Calendar from "./calendar";
import TimeSlots from "./timeSlots";
import CategorySelection from "./categorySelection";

const ReserveModal = ({ closeModal }: { closeModal: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
  });

  const infoFormRef = useRef<InfoFormRef>(null);

  const steps = [
    {
      label: "Info Form",
      component: (
        <InfoForm
          ref={infoFormRef}
          onDataChange={(data) => setFormData(data)}
        />
      ),
    },
    { label: "Calendar", component: <Calendar /> },
    { label: "Select Time", component: <TimeSlots /> },
    { label: "Photography Category", component: <CategorySelection /> },
  ];

  const nextStep = () => {
    if (currentStep === 0) {
      if (infoFormRef.current?.validateForm()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  console.log(formData);

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
          position: "relative",
        }}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-zinc-700 text-3xl
            hover:text-white hover:bg-rose-500 hover:shadow-lg hover:rounded-full
            hover:scale-110 hover:rotate-90 transition-all duration-300 ease-in-out p-2 z-30"
        >
          &times;
        </button>

        <h2 className="inline-block text-2xl font-semibold border-b-2 border-sky-500 mb-2">
          {steps[currentStep].label}
        </h2>
        {steps[currentStep].component}

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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

          {currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="bg-sky-400"
              style={{
                padding: "10px 20px",
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
