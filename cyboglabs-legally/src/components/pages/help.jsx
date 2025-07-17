// src/components/pages/HelpPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/help.css";

function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="help-page">
      <div className="headh"> <text>(FAQ) – Online NDA Signing Platform</text></div>
      <div className="help-card">

        <div class="faq-item">
      <h3>1. What is this platform about?</h3>
      <p>This is a digital platform for signing Non-Disclosure Agreements (NDAs) with the convenience of online and offline access, narrated explanations, and multi-language support. It ensures clarity, accessibility, security, and legality.</p>
    </div>
    
        <div class="faq-item">
      <h3>2. Is this NDA legally valid in India?</h3>
      <p>Yes. The NDA has been legally vetted and approved for use in India. When signed through the online method, it utilizes Aadhaar-based authentication and holds legal validity under Indian law.</p>
    </div>

    <div class="faq-item">
      <h3>3. How does the narration feature work?</h3>
      <p>Each clause and section of the NDA is accompanied by audio narration, available in multiple languages. This ensures that signers understand the content thoroughly before agreeing.</p>
    </div>

    <div class="faq-item">
      <h3>4. Which languages are supported?</h3>
      <p>Currently, we support 12 primary languages: English, Hindi, French, Tamil, Spanish, German, Italian, Japanese, Korean, Russian, Chinese, Arabic, Portuguese, Bengali, Gujarati, Marathi, Urdu. More languages will be added soon.</p>
    </div>

    <div class="faq-item">
      <h3>5. Can I sign the NDA offline?</h3>
      <p>Yes. The NDA can be downloaded and filled offline, then uploaded back to the same link once signed. This is useful for individuals without access to Aadhaar authentication or stable internet.</p>
    </div>

    <div class="faq-item">
      <h3>6. Who can use this platform?</h3>
      <p>Anyone requiring an NDA, whether you are an employer, collaborator, vendor, intern, or freelancer can use this platform. The online version is currently legally valid only within India.</p>
    </div>

    <div class="faq-item">
      <h3>7. How does Aadhaar-based signing work?</h3>
      <p>For Indian users, the platform enables digital signing via Aadhaar authentication, ensuring secure and identity-verified execution of the NDA.</p>
    </div>

    <div class="faq-item">
      <h3>8. Is this platform valid outside India?</h3>
      <p>Currently, the online signing feature is valid only within India due to Aadhaar-based authentication. For international users, we provide the option to download, sign, and upload the NDA manually. We are in the process of obtaining legal approvals for other countries.</p>
    </div>

    <div class="faq-item">
      <h3>9. Is my data safe?</h3>
      <p>Absolutely. We follow stringent data privacy and security protocols. No information is shared with third parties without consent, and all uploads and signatures are encrypted and securely stored.</p>
    </div>

    <div class="faq-item">
      <h3>10. Do I need to pay to use the platform?</h3>
      <p>No. The platform is currently free to use.</p>
    </div>

    <div class="faq-item">
      <h3>11. What if I still have questions?</h3>
      <p>Our narration feature is designed to guide you clause-by-clause. However, if you still have questions, you can reach out to our support team via email or chat on the platform.</p>
    </div>

     
      </div>
    </div>
  );
}

export default HelpPage;
