// src/components/pages/HelpPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/help.css";

function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="help-page">
      <div className="help-card">
        <img
          src="https://img.icons8.com/fluency/96/help.png"
          alt="Help"
          className="help-icon"
        />
        <h1>Help Page</h1>
        <p>Help content will be updated soon. Stay tuned for guidance and support.</p>
        <button className="help-back-button" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default HelpPage;
