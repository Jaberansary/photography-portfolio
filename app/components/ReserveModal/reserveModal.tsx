import React, { useState, useRef } from "react";
import InfoForm, { InfoFormRef, FormData } from "./infoForm";
import TimeSchedule from "./timeSchedule";
import PhotographyCategory from "./photographyCategory";
import dynamic from "next/dynamic";
const SetLocation = dynamic(() => import("./setLocation"), { ssr: false });

const ReserveModal = ({ closeModal }: { closeModal: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  const [errorMessage, setErrorMessage] = useState(""); // NEW

  const infoFormRef = useRef<InfoFormRef>(null);

  const steps = [
    {
      label: "Info Form",
      component: (
        <InfoForm
          ref={infoFormRef}
          onDataChange={(data) => setFormData(data)}
          defaultData={formData}
        />
      ),
    },
    {
      label: "Calendar",
      component: (
        <TimeSchedule
          onSelect={(date, slot) => {
            setSelectedDate(date);
            setSelectedTimeSlot(slot);
          }}
          initialDate={selectedDate}
          initialSlot={selectedTimeSlot}
        />
      ),
    },
    {
      label: "Photography Category",
      component: (
        <PhotographyCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ),
    },
    {
      label: "Photography Locations",
      component: (
        <SetLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          customLocation={customLocation}
          setCustomLocation={setCustomLocation}
        />
      ),
    },
    {
      label: "Preview Your Booking",
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-base my-4">
            <div className="flex">
              <span className="w-32 text-sky-500 font-medium">Full Name:</span>
              <span>{formData.fullName || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-sky-500 font-medium">Email:</span>
              <span>{formData.email || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-sky-500 font-medium">Phone:</span>
              <span>{formData.phone || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-sky-500 font-medium">Date:</span>
              <span>{selectedDate?.toLocaleDateString() || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-sky-500 font-medium">Time Slot:</span>
              <span>{selectedTimeSlot || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-sky-500 font-medium">Category:</span>
              <span>{selectedCategory || "-"}</span>
            </div>
            <div className="flex col-span-1 sm:col-span-2">
              <span className="w-32 text-sky-500 font-medium">Location:</span>
              <span>{selectedLocation || customLocation || "-"}</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    setErrorMessage("");
    if (currentStep === 0) {
      if (infoFormRef.current?.validateForm()) {
        setCurrentStep(currentStep + 1);
      } else {
        setErrorMessage("Please fill out all required fields.");
      }
    } else if (currentStep === 1) {
      if (selectedDate && selectedTimeSlot) {
        setCurrentStep(currentStep + 1);
      } else {
        setErrorMessage("Please select a date and a time slot.");
      }
    } else if (currentStep === 3) {
      if (selectedLocation || customLocation.trim()) {
        setCurrentStep(currentStep + 1);
      } else {
        setErrorMessage("Please select or enter a location.");
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setErrorMessage("");
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

        <h2 className="inline-block text-2xl font-semibold border-b-2 border-sky-400 mb-4">
          {steps[currentStep].label}
        </h2>
        {steps[currentStep].component}

        {errorMessage && (
          <p className="text-rose-500 mt-4 text-sm font-medium">
            {errorMessage}
          </p>
        )}

        <div className="mt-6 flex justify-between items-center">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 hover:scale-105 transition-all duration-300"
            >
              Previous
            </button>
          )}

          {currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="ml-auto px-6 py-3 rounded-full text-white shadow-lg transition-all duration-300 bg-sky-400 hover:bg-sky-600"
            >
              Next
            </button>
          )}

          {currentStep === steps.length - 1 && (
            <button
              onClick={() => {
                alert("Booking confirmed!");
                closeModal();
              }}
              className="ml-auto px-6 py-3 rounded-full text-white bg-sky-400 hover:bg-sky-600 hover:scale-105 shadow-lg transition-all duration-300"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReserveModal;
