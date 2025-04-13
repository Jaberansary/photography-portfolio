import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";

export type FormData = {
  fullName: string;
  phone: string;
  email: string;
};

type InfoFormProps = {
  onDataChange: (data: FormData) => void;
};

export type InfoFormRef = {
  validateForm: () => boolean;
};

const InfoForm: ForwardRefRenderFunction<InfoFormRef, InfoFormProps> = (
  { onDataChange },
  ref
) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onDataChange(updatedData);

    if (name === "fullName") {
      if (value.trim().length < 3 || !/^[a-zA-Z\s]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          fullName: "Enter a valid name (only letters, min 3 chars).",
        }));
      } else {
        setErrors((prev) => ({ ...prev, fullName: "" }));
      }
    }

    if (name === "phone") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Only digits are allowed.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const newErrors = {
        fullName: "",
        phone: "",
      };


      if (formData.fullName.trim().length < 3) {
        newErrors.fullName = "Name must be at least 3 characters.";
      } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
        newErrors.fullName = "Only letters are allowed in the name.";
      }


      if (!/^\d{10,}$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone must be at least 10 digits and numeric.";
      }

      setErrors(newErrors);


      if (
        formData.email &&
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
      ) {
        alert("Please enter a valid email address.");
        return false;
      }

      return Object.values(newErrors).every((err) => err === "");
    },
  }));

  return (
    <form className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name: <span className="text-red-500">*</span>
        </label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-2 border ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number: <span className="text-red-500">*</span>
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-2 border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Address (Optional):
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="Optional"
        />
      </div>
    </form>
  );
};

export default forwardRef(InfoForm);
