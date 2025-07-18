


import React, { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";
import axios from "axios";
import r from "../../assets/1.svg";
import l from "../../assets/2.svg";
import a from "../../assets/a.svg";
import p from "../../assets/p.svg";
import w from "../../assets/w.svg";
import m from "../../assets/m.svg";
import logo from "../../assets/sign.svg";
import "../css/nda.css";
import sign from "../../assets/sign.jpg"
import Lottie from "lottie-react";
import Translate from "../../assets/trans.json";


// Supported languages for translation and speech
const supportedLanguages = [
  { code: "en-US", name: "English" },
  { code: "ta-IN", name: "Tamil" },
  { code: "hi-IN", name: "Hindi" },
  { code: "fr-FR", name: "French" },
  { code: "es-ES", name: "Spanish" },
  { code: "de-DE", name: "German" },
  { code: "it-IT", name: "Italian" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "ru-RU", name: "Russian" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ar-SA", name: "Arabic" },
  { code: "pt-PT", name: "Portuguese" },
  { code: "bn-IN", name: "Bengali" },
  { code: "gu-IN", name: "Gujarati" },
  { code: "mr-IN", name: "Marathi" },
  { code: "ur-IN", name: "Urdu" },
];

const LINES_PER_PAGE = 5; // Number of lines to display per page
const RTL_LANGUAGES = ["ar-SA", "ur-IN"]; // Right-to-left languages

const NDAStyledLayout = forwardRef(({ lang = "en-US", formData, setFormData, setShowModal, handleSubmit }, ref) => {
  const ndaTranslations = {
    "en-US": [
      `This Non-Disclosure Agreement (“Agreement”) is entered into on ${formData.fromDate ? formData.fromDate:"_______________"} (“Effective Date”), by and between Cyboglabs Private Limited, a company, having its principal office at NO.11/20, PAMMAL ANNA NAGAR, 9th CROSS STREET, CHENNAI - 600075, TAMIL NADU, INDIA, hereinafter referred to as “Company” and ${formData.company ? formData.company:"_______________"} , having its principal place of business or residence at  ${formData.companyAddress?formData.companyAddress:"_____________________________"} hereinafter referred “Receiving Party."`,
      "WHEREAS, the Company is engaged in the business of research and development, engineering innovations, technological product development, scientific investigations, problem-solving methodologies, and allied activities",
      "AND WHEREAS, the Receiving Party may, in the course of its engagement with the Company as an employee, consultant, vendor, service provider, intern, collaborator, or in any other capacity, gain access to certain non-public, confidential, and proprietary information;",
      "NOW, THEREFORE, in consideration of the mutual promises and covenants herein, the Parties agree as follows:",
      <strong  key="section1">1. For this Agreement, “Confidential Information” shall mean all non-public, proprietary, sensitive, or privileged information, whether written, oral, electronic, visual, or in any other tangible or intangible form, disclosed or made available by the Company to the Receiving Party, directly or indirectly, including without limitation:</strong>,
      "a. Technical data, experimental results, engineering designs, specifications, formulations, schematics, blueprints, CAD files, source code, algorithms, software architecture, system documentation, research papers, development processes, and testing protocols;",
      "b. Product plans, prototypes, patents, patent applications, invention disclosures, and trade secrets",
      "c. Internal reports, presentations, memoranda, meeting notes, emails, and correspondence;",
      "d. Strategic business plans, sales and marketing strategies, pricing data, market analysis, customer and supplier lists, leads, and business opportunities;",
      "e. Financial statements, funding information, budgets, cost structures, and projections;",
      "f. Information related to tools, equipment, machinery, and technology stacks used in operations or product development;",
      "g. Login credentials, access codes, passwords, server configurations, and infrastructure documentation;",
      "h. All personal data or sensitive personal information as defined under applicable data protection laws;",
      "i. Any other information which, by its nature or the circumstances of its disclosure, ought reasonably to be treated as confidential.",
      "Confidential Information also includes all derivatives, analyses, compilations, summaries, and other materials prepared by or for the Receiving Party that contain or are derived from such Confidential Information.",
      <strong key="section2">2. The Receiving Party hereby agrees that it shall:</strong>,
      "a. Maintain the Confidential Information in strict confidence and not disclose it to any third party without the prior written consent of the Company;",
      "b. Use the Confidential Information solely to perform its obligations or functions for the Company and not for any personal benefit or third-party advantage;",
      "c. Not make any copies, reproductions, reverse engineering, extracts, summaries, transcriptions, or recordings of the Confidential Information except as strictly necessary and expressly permitted in writing by the Company;",
      "d. Not disclose, share, transmit, distribute, publish, or utilise (either physically, electronically, digitally, verbally, or otherwise) any outputs, modifications, enhancements, tools, derivatives, or other materials that are created using or contributing to the Company’s Confidential Information. This includes, but is not limited to, any content, code, design, documentation, process, or result that incorporates or is based upon such information. Such materials shall not be repurposed, directly or indirectly, for any other entity, academic study, publication, third-party project, commercial venture, or research initiative outside the scope of engagement with the Company;",
      "e. Promptly notify the Company in writing upon discovering any unauthorised use or disclosure of Confidential Information or any other breach of this Agreement;",
      "f. Restrict disclosure of the Confidential Information only to those of its employees, agents, contractors, or affiliates who have a legitimate “need to know” and who are bound by confidentiality obligations;",
      "g. Not assign or transfer any rights or obligations under this Agreement without the prior written consent of the Company.",
      <strong key="section3">3. Confidential Information shall not include any information which:</strong>,
      "a. Was in the lawful possession of the Receiving Party prior to disclosure by the Company, as evidenced by written documentation;",
      "b. Becomes publicly available through no fault or breach of the Receiving Party;",
      "c. Is lawfully disclosed to the Receiving Party by a third party who is not in violation of any obligation of confidentiality;",
      "d. Is independently developed by the Receiving Party without reference to or use of the Confidential Information; or",
      "e. Is required to be disclosed under any applicable law, regulation, or valid court or governmental order, provided that the Receiving Party gives the Company prompt written notice of such requirement.",
      <strong key="section4">4. This Agreement shall commence on the “Effective Date” and shall continue for the duration of the engagement or relationship between the Parties, or such longer period as required by law, or in the case of trade secrets, indefinitely until such information lawfully enters the public domain.</strong>,
      <strong key="section5">5. Upon termination of the engagement or written request from the Company, the Receiving Party shall, within seven (7) days:</strong>,
      "a. Return all documents, materials, media, and records containing Confidential Information,",
      "b. Permanently destroy such materials (in both digital and physical form), ",
      "c. Provide a written certification of compliance with this clause, if requested.",
      <strong key="section6">6. Nothing in this Agreement shall be construed as granting, either expressly or by implication, any license, ownership, or other rights to the Receiving Party in or to any Confidential Information, patents, copyrights, trademarks, or other intellectual property of the Company.</strong>,
      <strong key="section7">7. The Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to the Company, for which monetary damages may be inadequate. Accordingly, the Company shall be entitled to seek injunctive relief, specific performance, or any other equitable remedy, in addition to any other legal remedies available under law.</strong>,
      <strong key="section8">8. This Agreement shall be governed by the laws of the Republic of India. The courts located in Tamil Nadu shall have exclusive jurisdiction over any disputes arising out of or in connection with this Agreement. If any provision of this Agreement is held to be unenforceable, such provision shall be modified to the extent necessary to make it enforceable or, if not possible, severed, and the remaining provisions shall remain in full force and effect</strong>,
      <strong key="witness">IN WITNESS WHEREOF, the Parties hereto have executed this Non-Disclosure Agreement as of the Effective Date.</strong>,
    ],
  };

  const lineRefs = useRef([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [selectedLang, setSelectedLang] = useState(lang);
  const [translatedLines, setTranslatedLines] = useState(ndaTranslations["en-US"]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const translatedLinesRef = useRef(translatedLines);
const selectedLangRef = useRef(selectedLang);
const currentPageRef = useRef(currentPage);

  // Google Translate API endpoint
  const GOOGLE_TRANSLATE_API_URL = "https://translation.googleapis.com/language/translate/v2";
  const API_KEY = "AIzaSyAv9_7EflOJAXFg5gusLvMw5hhlKiVwZf0"; // Replace with your Google Cloud Translate API key

  // Load available voices for speech synthesis
  const [voices, setVoices] = useState([]);


  useEffect(() => {
  translatedLinesRef.current = translatedLines;
}, [translatedLines]);

useEffect(() => {
  selectedLangRef.current = selectedLang;
}, [selectedLang]);

useEffect(() => {
  currentPageRef.current = currentPage;
}, [currentPage]);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(speechSynthesis.getVoices());
    };
    updateVoices();
    speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Fetch translations when language changes
  useEffect(() => {
    if (selectedLang === "en-US") {
      setTranslatedLines(ndaTranslations["en-US"]);
      setCurrentPage(0);
      return;
    }

    const translateText = async () => {
      setIsTranslating(true);
      try {
        const translations = await Promise.all(
          ndaTranslations["en-US"].map(async (line) => {
            if (React.isValidElement(line)) {
              const textContent = line.props.children;
              const response = await axios.post(
                `${GOOGLE_TRANSLATE_API_URL}?key=${API_KEY}`,
                {
                  q: textContent,
                  source: "en",
                  target: selectedLang.split("-")[0],
                  format: "text",
                }
              );
              return <strong key={line.props.key}>{response.data.data.translations[0].translatedText}</strong>;
            }
            const response = await axios.post(
              `${GOOGLE_TRANSLATE_API_URL}?key=${API_KEY}`,
              {
                q: line,
                source: "en",
                target: selectedLang.split("-")[0],
                format: "text",
              }
            );
            return response.data.data.translations[0].translatedText;
          })
        );
        setTranslatedLines(translations);
        setCurrentPage(0);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedLines(ndaTranslations["en-US"]);
      } finally {
        setIsTranslating(true);
      }
    };

    translateText();
  }, [selectedLang]);

  useImperativeHandle(ref, () => ({
    startSpeaking,
    stopReading,
  }));

  // const speakLine = (index, lang) => {
  //   const pageStartIndex = currentPage * LINES_PER_PAGE;
  //   const adjustedIndex = pageStartIndex + index;

  //   if (adjustedIndex >= translatedLines.length) {
  //     setIsSpeaking(false);
  //     setCurrentLine(null);
  //     return;
  //   }

  //   setCurrentLine(index);

  //   let lineContent = translatedLines[adjustedIndex];
  //   if (React.isValidElement(lineContent)) {
  //     lineContent = lineContent.props.children;
  //   }

  //   const cleanedLine = typeof lineContent === "string" ? lineContent.replace(/^[a-z0-9]+\.\s*/i, "") : "";

  //   const utterance = new SpeechSynthesisUtterance(cleanedLine);
  //   utterance.lang = lang;
  //   const voice = voices.find((v) => v.lang === lang) || voices[0];
  //   utterance.voice = voice;
  //   utterance.rate = 1;

  //   utterance.onend = () => {
  //     const nextIndex = index + 1;
  //     if (nextIndex >= LINES_PER_PAGE && adjustedIndex + 1 < translatedLines.length) {
  //       setCurrentPage((prev) => prev + 1);
  //       setCurrentLine(null);
  //       speakLine(0, lang);
  //     } else {
  //       speakLine(nextIndex, lang);
  //     }
  //   };

  //   const el = lineRefs.current[index];
  //   if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });

  //   speechSynthesis.speak(utterance);
  // };
  const speakLine = (index) => {
  const lines = translatedLinesRef.current;
  const lang = selectedLangRef.current;
  const page = currentPageRef.current;

  const pageStartIndex = page * LINES_PER_PAGE;
  const adjustedIndex = pageStartIndex + index;

  if (adjustedIndex >= lines.length) {
    setIsSpeaking(false);
    setCurrentLine(null);
    return;
  }

  setCurrentLine(index);

  let lineContent = lines[adjustedIndex];
  if (React.isValidElement(lineContent)) {
    lineContent = lineContent.props.children;
  }

  const cleanedLine = typeof lineContent === "string"
    ? lineContent.replace(/^[a-z0-9]+\.\s*/i, "")
    : "";

  const utterance = new SpeechSynthesisUtterance(cleanedLine);
  utterance.lang = lang;
  const voice = voices.find((v) => v.lang === lang) || voices[0];
  utterance.voice = voice;
  utterance.rate = 1;

  utterance.onend = () => {
    const nextIndex = index + 1;
    if (nextIndex >= LINES_PER_PAGE && pageStartIndex + LINES_PER_PAGE < lines.length) {
      const nextPage = page + 1;
      setCurrentPage(nextPage);
      currentPageRef.current = nextPage; // update ref
      setCurrentLine(null);
      setTimeout(() => speakLine(0), 300); // slight delay to allow page update
    } else {
      speakLine(nextIndex);
    }
  };

  const el = lineRefs.current[index];
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });

  speechSynthesis.speak(utterance);
};

  // const startSpeaking = (lang = selectedLang) => {
  //   speechSynthesis.cancel();
  //   setIsSpeaking(true);
  //   setCurrentLine(null);
  //   speakLine(0, lang);
  // };
  const startSpeaking = () => {
  speechSynthesis.cancel();
  setIsSpeaking(true);
  setCurrentLine(null);
  speakLine(0);
};

  const stopReading = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentLine(null);
  };

  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
    stopReading();
    setCurrentPage(0);
  };

  // Pagination logic
  const totalPages = Math.ceil(translatedLines.length / LINES_PER_PAGE);
  const startIndex = currentPage * LINES_PER_PAGE;
  const endIndex = startIndex + LINES_PER_PAGE;
  const currentPageLines = translatedLines.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      setCurrentLine(null);
      stopReading();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setCurrentLine(null);
      stopReading();
    }
  };

  return (
    <div className="nda-wrapper">
     {!isTranslating &&
      <div className="pagination-controls">
        <div
          onClick={handlePrevPage}
          style={{opacity:currentPage === 0?0:1}}
          disabled={currentPage === 0}
          className="page-button next-btn1"
          aria-label="Previous page"
        >
          <img src={r}  className="leftimg" alt="Previous page" />
        </div>
        <div
          onClick={handleNextPage}
           style={{opacity:currentPage === totalPages - 1?0:1}}
          // disabled={currentPage === totalPages - 1}
          className="page-button next-btn1"
          aria-label="Next page"
        >
          <img src={l}   className="leftimg" alt="Next page" />
        </div>
      </div>
}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "10px" }}>
        <div className="languge">

          <div
            onClick={() => (isSpeaking ? stopReading() : startSpeaking())}
            disabled={isTranslating}
            className="speak-button"
            aria-label={isSpeaking ? "Stop reading" : "Start reading"}
          >
            <img src={a}  className="spki" alt="Speak" />
          </div>
         <select
  id="language"
  value={selectedLang}
  onChange={handleLanguageChange}
  disabled={isTranslating}
className="language-select"
>
  {supportedLanguages.map((lang) => (
    <option key={lang.code} value={lang.code} style={{ padding: "1px", fontSize: "16px" }}>
      {lang.name}
    </option>
  ))}
</select>

        </div>
      </div>
      <div className="nda-header">
        <div className="nda-left">
          <div className="het">
            <img src={w} alt="web"/>
                 <p className="ht">
                 www.cyboglabs.com
          </p>
          </div>
           <div className="het">
            <img src={m} alt="web"/>
         <p className="ht1">support@cyboglabs.com</p>
          </div>
     
                <div className="het">
            <img src={p} alt="web"/>
       <p className="ht1" >+91 -75501 79001, 90803 11530</p>
          </div>
        
        </div>
        <div className="nda-right">
          <img src={logo} alt="Cybog Labs Logo" className="nda-logo" />
       
        </div>
      </div>
 

      <div className="nda-content" dir={RTL_LANGUAGES.includes(selectedLang) ? "rtl" : "ltr"}>
                    {isTranslating &&
      <div className="language-selector">
        <Lottie animationData={Translate} loop={true} className="lottietrans" />
      </div>}
        {currentPageLines.map((line, index) => (
          <div
            key={index}
            ref={(el) => (lineRefs.current[index] = el)}
            className={`nda-line ${currentLine === index ? "highlight-read" : ""}`}
          >
            {line}
          </div>
        ))}
        {currentPage === totalPages - 1 && (
          <div>
            <div className="nda-signature-block" ref={ref}>
              <div className="sign">
                <h5>CYBOGLABS PRIVATE LIMITED</h5>
              <div className="sing">  <p>Signature:</p>
              <img src={sign} alt="sign" />
              </div>
               <div className="signp">
                <p>Date</p>   <p>:{formData.fromDate ? formData.fromDate:"_______________"}</p>
                </div>
            
              </div>
              <div className="sign">
                <h5>RECEIVING PARTY</h5>
                <div className="signp">

                <p className="la">Name </p>    <p className="text">:{formData.fullName ? formData.fullName:"_______________"}</p>
                </div>
                 <div className="signp">
                <p>Designation</p><p>:{formData.role ? formData.role:"_______________"}</p>
                </div>
                     <div className="signp">
                <p>Signature</p><p>:</p>
                </div>
          <div className="signp">
                <p>Date</p> <p> :{formData.fromDate ? formData.fromDate:"_______________"}</p>
                </div>
              
              </div>
            </div>
            <div className="sub">
              <button
                onClick={handleSubmit}
                disabled={isTranslating || isSpeaking}
                style={{
                  padding: "6px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: isTranslating || isSpeaking ? "not-allowed" : "pointer",
                  marginTop: "20px",
                }}
                aria-label="Submit NDA"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <footer className="nda-footer">
        <text>
          📍 NO.11/20, PAMMAL ANNA NAGAR, 9<sup>th</sup> CROSS STREET, CHENNAI - 600 075, TAMIL NADU, INDIA.
        </text>
      </footer>
    </div>
  );
});

export default NDAStyledLayout;