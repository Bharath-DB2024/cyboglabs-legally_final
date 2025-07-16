


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../css/offline.css";
import NDAStyledLayout from "./nda";
import a from "../../assets/a.svg";
import Lottie from "lottie-react";
import Downlaod from "../../assets/Download.json";
function Offline() {
    const [formData, setFormData] = useState({
        fullName: "",
        company: "",
        // adharNumber: "",
        companyAddress: "",
        phone: "",
        contractDescription: "",
        email: "",
        fromDate: "",
        fromDate2: "",
        role: "",
        status: "Completed",
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [message, setMessage] = useState("");
    const [isSdkLoaded, setIsSdkLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ndaRef = useRef();
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState("");
      const [isDownloading, setIsDownloading] = useState(false);

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

    // Validate form inputs
    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.company.trim()) newErrors.company = "Company is required";
        // if (!/^\d{12}$/.test(formData.adharNumber.trim())) newErrors.adharNumber = "Aadhar Number must be 12 digits";
        if (!formData.companyAddress.trim()) newErrors.companyAddress = "Company Address is required";
        if (!/^\d{10}$/.test(formData.phone.trim())) newErrors.phone = "Phone Number must be 10 digits";
        if (!formData.contractDescription.trim()) newErrors.contractDescription = "Contract Description is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.fromDate.trim()) newErrors.fromDate = "Start Date is required";
        if (!formData.fromDate2.trim()) newErrors.fromDate2 = "End Date is required";
        if (!formData.role.trim()) newErrors.role = "Role is required";
         if (!selectedFileName) newErrors.selectedFileName = "Document file is required"; // ✅ File check
        return newErrors;
    };

    // Handle form submission (triggered from NDAStyledLayout)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setShowModal(false);
            return;
        }

        setIsLoading(true);
        setErrors({});
        setShowModal(false);

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            if (fileInputRef.current?.files[0]) {
                formDataToSend.append("pdf", fileInputRef.current.files[0]);
            }

            const response = await axios.post("http://localhost:3000/api/upload", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(`Saved! ID: ${response.data.id}`);
            setFormData({ fullName: "", company: "", adharNumber: "", companyAddress: "", phone: "", contractDescription: "", email: "", fromDate: "", fromDate2: "", role: "", status: "pending" });
            setSelectedFileName("");
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message;
            setMessage(`Error submitting form: ${errorMessage}`);
            console.error("Error:", errorMessage);
        } finally {
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
const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const response = await fetch("http://localhost:3000/api/download");
      const blob = await response.blob();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "document.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

    return (
        <div className="online-container">
            <main className="main-content">
                <div className="main-header">
                    <h1>Offline NDA</h1>
                        <button onClick={handleDownload} className="download-btn">
      {isDownloading ? (
        <Lottie animationData={downloadAnimation} loop={true} style={{ width: 40, height: 40 }} />
      ) : (
        <>
          <img src="/download-icon.svg" alt="download" style={{ width: 20, height: 20, marginRight: 8 }} />
          Download Document
        </>
      )}
    </button>

                </div>

                {message && (
                    <p className="message" style={{ color: message.includes("Error") ? "red" : "green" }}>
                        {message}
                    </p>
                )}

                <form className="nda-form" onSubmit={handleSubmit}>
                    <div className="in">
                        <input
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            style={{ borderColor: errors.fullName ? "red" : "#ccc" }}
                        />
                        {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                    </div>
                    <div className="in">
                        <input
                            name="company"
                            placeholder="Company"
                            value={formData.company}
                            onChange={handleChange}
                            style={{ borderColor: errors.company ? "red" : "#ccc" }}
                        />
                        {errors.company && <p className="error-message">{errors.company}</p>}
                    </div>
             
                    <div className="in">
                        <input
                            name="companyAddress"
                            placeholder="Company Address"
                            value={formData.companyAddress}
                            onChange={handleChange}
                            style={{ borderColor: errors.companyAddress ? "red" : "#ccc" }}
                        />
                        {errors.companyAddress && <p className="error-message">{errors.companyAddress}</p>}
                    </div>
                    <div className="in">
                        <input
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ borderColor: errors.phone ? "red" : "#ccc" }}
                        />
                        {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>
                    <div className="in">
                        <input
                            name="contractDescription"
                            placeholder="Contract Description"
                            value={formData.contractDescription}
                            onChange={handleChange}
                            style={{ borderColor: errors.contractDescription ? "red" : "#ccc" }}
                        />
                        {errors.contractDescription && <p className="error-message">{errors.contractDescription}</p>}
                    </div>
                    <div className="in">
                        <input
                            name="email"
                            placeholder="Email ID"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ borderColor: errors.email ? "red" : "#ccc" }}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="in">
                        <input
                            name="role"
                            placeholder="Role"
                            value={formData.role}
                            onChange={handleChange}
                            style={{ borderColor: errors.role ? "red" : "#ccc" }}
                        />
                        {errors.role && <p className="error-message">{errors.role}</p>}
                    </div>
                    <div className="in">
                        <div className="upload">
                        <button className="preview-btn" onClick={() => fileInputRef.current.click()} style={{opacity:selectedFileName?0.4:1}}>
                           Upload Document
                        </button>
                        <text className="uptext">{selectedFileName} </text>
                        </div>

                      {errors.selectedFileName && <p className="error-message">{errors.selectedFileName}</p>}
                    </div>
                    <div className="date">
                        <div className="in1">
                            <input
                                name="fromDate"
                                type="date"
                                value={formData.fromDate}
                                onChange={handleChange}
                                style={{ borderColor: errors.fromDate ? "red" : "#ccc" }}
                            />
                            {errors.fromDate && <p className="error-message">{errors.fromDate}</p>}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="application/pdf"
                            style={{ display: "none" }}
                            
                            onChange={(e) => {
                                const file = e.target.files[0];
                              
                                if (file) {
                                    console.log("PDF selected:", file);
                                    setSelectedFileName(file.name)
                                    const pdfUrl = URL.createObjectURL(file);
                                    window.open(pdfUrl, "_blank"); // or use a modal preview if needed
                                       setErrors((prevErrors) => ({ ...prevErrors, selectedFileName: "" }));
                                }
                            }}
                        />
                        <div className="in1">
                            <input
                                name="fromDate2"
                                type="date"
                                value={formData.fromDate2}
                                onChange={handleChange}
                                style={{ borderColor: errors.fromDate2 ? "red" : "#ccc" }}
                            />
                            {errors.fromDate2 && <p className="error-message">{errors.fromDate2}</p>}
                        </div>
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
                            <button type="submit" className="submit-btn" onClick={handlePreviewClick}>
                                Sumbit
                            </button>
                        </div>
                    </div>
                </form>
            </main>

            {showModal && (
                <div className="pop">
                    <div className="pdfpop">
                        <div className="cl" onClick={closeModal}>
                            <p className="close-button">X</p>
                        </div>

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

export default Offline;