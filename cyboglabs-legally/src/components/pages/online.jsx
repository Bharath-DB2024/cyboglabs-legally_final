




import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../css/online.css";
import NDAStyledLayout from "./nda";
import a from "../../assets/a.svg";
import close from "../../assets/close.svg";
import Downlaod from "../../assets/a.svg";

function Online() {
    const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    adharNumber: "",
    companyAddress: "",
    phone: "",
    contractDescription: "",
    email: "",
    fromDate: today,
    fromDate2:today,
    role: "",
    status: "pending",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [message, setMessage] = useState("");
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ndaRef = useRef();

  // Supported languages


  // Load Leegality SDK dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/leegalityv7.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      console.log("Leegality SDK loaded");
      setIsSdkLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load Leegality SDK");
      setMessage("Failed to load Leegality SDK");
      setIsSdkLoaded(false);
    };
    return () => document.body.removeChild(script);
  }, []);

  // Initialize Leegality SDK
  const initLeegality = (signingUrl, id) => {
  if (!window.Leegality || !isSdkLoaded) {
    setMessage("Leegality SDK not loaded");
    console.error("❌ Leegality SDK not loaded");
    setIsLoading(false);
    return;
  }
  console.log(signingUrl, id);

  // Use closure to capture `id` properly
  const callback = async (response) => {
    if (response.error) {
      setMessage(response.error);
      console.error("❌ Signing error:", response);

      await fetch("http://localhost:3000/api/signing-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id, // use outer function `id`
          status: "failed",
          message: response.error,
        }),
      });
    } else {
      setMessage(response.message);
      setIsLoading(false);
      console.log("✅ Signing success:", response);

      await fetch("http://localhost:3000/api/signing-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id, // use outer function `id`
          status: "success",
          message: response.message,
        }),
      });
    }
    setIsLoading(false);
  };

  const options = {
    logoUrl: "",
    callback,
  };

  const leegality = new window.Leegality(options);
  leegality.init();
  leegality.esign(signingUrl);
};

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!/^\d{12}$/.test(formData.adharNumber.trim())) newErrors.adharNumber = "Aadhar Number must be 12 digits";
    if (!formData.companyAddress.trim()) newErrors.companyAddress = "Company Address is required";
    if (!/^\d{10}$/.test(formData.phone.trim())) newErrors.phone = "Phone Number must be 10 digits";
    if (!formData.contractDescription.trim()) newErrors.contractDescription = "Contract Description is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    // if (!formData.fromDate.trim()) newErrors.fromDate = "Start Date is required";
    // if (!formData.fromDate2.trim()) newErrors.fromDate2 = "End Date is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    return newErrors;
  };

  // Handle form submission (triggered from NDAStyledLayout)
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowModal(false); // Close modal if validation fails
      return;
    }
    setErrors({});
    setIsLoading(true); // Show loading popup

    try {
      setShowModal(false);
      console.log("Form Data:", formData);
      const response = await axios.post("http://localhost:3000/api/form", formData);
      alert(response.data.id);
      console.log("Form submitted successfully:", response.data.url);
      setMessage("Initiating eSigning...");
      initLeegality(response.data.url, response.data.id);

      setFormData({
        fullName: "",
        company: "",
        adharNumber: "",
        companyAddress: "",
        phone: "",
        contractDescription: "",
        email: "",
        fromDate: "",
        fromDate2: "",
        role: "",
        status: "pending",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setMessage(`Error submitting form: ${errorMessage}`);
      console.error("Error submitting form:", errorMessage);
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handlePreviewClick = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setIsLoading(false);
    ndaRef.current?.stopReading();
  };

  return (
    <div className="online-container">
      <main className="main-content">
        <div className="main-header">
          <h1>Online NDA</h1>
          <button className="preview-btn" onClick={handlePreviewClick}>
           Preview
          </button>
        </div>

        {message && (
          <p className="message" style={{ color: message.includes("Error") ? "red" : "green" }}>
            {message}
          </p>
        )}

        <form className="nda-form">
          <div className="in">
            <input
              name="fullName"
              placeholder="Enter Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              style={{ borderColor: errors.fullName ? "red" : "#ccc" }}
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>
          <div className="in">
            <input
              name="company"
              placeholder=" Enter Your Company Name"
              value={formData.company}
              onChange={handleChange}
              style={{ borderColor: errors.company ? "red" : "#ccc" }}
            />
            {errors.company && <p className="error-message">{errors.company}</p>}
          </div>
          <div className="in">
            <input
              name="adharNumber"
              placeholder=" Enter 12 Digit Aadhar Number"
              value={formData.adharNumber}
              onChange={handleChange}
              style={{ borderColor: errors.adharNumber ? "red" : "#ccc" }}
            />
            {errors.adharNumber && <p className="error-message">{errors.adharNumber}</p>}
          </div>
          <div className="in">
            <input
              name="companyAddress"
              placeholder=" Enter Your Company Address"
              value={formData.companyAddress}
              onChange={handleChange}
              style={{ borderColor: errors.companyAddress ? "red" : "#ccc" }}
            />
            {errors.companyAddress && <p className="error-message">{errors.companyAddress}</p>}
          </div>
          <div className="in">
            <input
              name="phone"
              placeholder="Enter Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={{ borderColor: errors.phone ? "red" : "#ccc" }}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
          <div className="in">
            <input
              name="contractDescription"
              placeholder="Enter Your Contract Description"
              value={formData.contractDescription}
              onChange={handleChange}
              style={{ borderColor: errors.contractDescription ? "red" : "#ccc" }}
            />
            {errors.contractDescription && <p className="error-message">{errors.contractDescription}</p>}
          </div>
          <div className="in">
            <input
              name="email"
              placeholder="Enter Your Email ID"
              value={formData.email}
              onChange={handleChange}
              style={{ borderColor: errors.email ? "red" : "#ccc" }}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="in">
            <input
              name="role"
              placeholder="Enter Your Role"
              value={formData.role}
              onChange={handleChange}
              style={{ borderColor: errors.role ? "red" : "#ccc" }}
            />
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>
          <div className="date"  >
         
         
          </div>
          <div className="checkbox-row">
            <div className="button-row">
              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  setFormData({
                    fullName: "",
                    company: "",
                    adharNumber: "",
                    companyAddress: "",
                    phone: "",
                    contractDescription: "",
                    email: "",
                    fromDate: "",
                    fromDate2: "",
                    role: "",
                    status: "pending",
                  })
                }
              >
                Cancel
              </button>
              {/* <button type="submit" className="submit-btn">Submit</button> */}
              <button type="button" className="submit-btn" onClick={handlePreviewClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </main>

      {showModal && (
        <div className="pop">
          <div className="pdfpop">
            <div className="cl" onClick={closeModal}>
              <img src={close}  className="closeimg" alt="close" />
            </div>
            <NDAStyledLayout
              ref={ndaRef}
              lang={language}
              formData={formData}
              setFormData={setFormData}
              setShowModal={setShowModal}
              handleSubmit={handleSubmit1}
            />
            {/* {message && (
              <p className="message" style={{ color: message.includes("Error") ? "red" : "green", margin: "10px" }}>
                {message}
              </p>
            )} */}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-popup">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Submitting...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Online;