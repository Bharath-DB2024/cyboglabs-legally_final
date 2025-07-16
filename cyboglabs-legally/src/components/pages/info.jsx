// src/components/pages/InfoPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/info.css";

function InfoPage() {
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <div className="info-card">
        <img
          src="https://img.icons8.com/fluency/96/info.png"
          alt="Info"
          className="info-icon"
        />
        <h1>Info Page</h1>
        <p>This section will be updated soon with more details and features.</p>
        <button className="info-back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default InfoPage;
