import React, { useState } from "react";
import axios from "axios";
import "../css/upload.css";

function UploadDownload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedId, setUploadedId] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const response = await axios.put("http://localhost:3000/api/upload/admin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedId(response.data.id);
      alert("✅ File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed.");
    }
  };

  const handleDownload = () => {
    if (!uploadedId) return alert("No document uploaded yet.");
    window.open(`http://localhost:3000/api/download/${uploadedId}`);
  };

  return (
    <div className="container">
      <h2>Upload & Download PDF</h2>
      <input type="file" accept="application/pdf" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={handleUpload}>⬆ Upload Document</button>
      <button  className ="uploadb" onClick={handleDownload}>⬇ Download Document</button>
    </div>
  );
}

export default UploadDownload;
