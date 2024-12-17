import React, { useState } from "react";
import style from "../../../styles/taxfile.module.css";
import Details from "./Details";
import UploadFiles from "./UploadFiles";
import Preview from "./Preview";

const TaxFile = () => {
  const [data, setData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [completedSections, setCompletedSections] = useState({
    1: false,
    2: false,
  });

  const [formData, setFormData] = useState({
    details: {
      name: "",
      spouseName: "",
      phoneNumber: "",
      salary: "",
      city: "",
    },
    uploadFiles: {
      nidNumber: "",
      tinNumber: "",
      bankStatement: null,
      remittance: null,
      dpsStatement: null,
      fdrStatement: null,
      lastTaxFile: null,
      remarks: "",
    },
  });

  const handleInputChange = (formSection, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [formSection]: {
        ...prevData[formSection],
        [field]: value,
      },
    }));
  };

  const handleFormSubmit = (section) => {
    if (section === 1) {
      setActiveSection(2);
      setCompletedSections((prevState) => ({ ...prevState, 1: true }));
    } else if (section === 2) {
      setCompletedSections((prevState) => ({ ...prevState, 2: true }));
      setShowPreview(true);
      setData(formData);
    }
  };
  // const handleFormSubmit = () => {
  //   setShowPreview(true);
  //   setData(formData);
  // };

  // useEffect(() => {
  //   console.table(data);
  // }, [data]);

  const navigateToSection = (section) => {
    if (
      completedSections[section] ||
      section === activeSection ||
      section === activeSection + 1
    ) {
      setActiveSection(section);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <div id="wrapper">
      <div id="content">
        <div className={style.taxFilingForm}>
          <div className={style.indicatorContainer}>
            <button
              className={`${style.navButton} ${
                completedSections[1] ? style.active : ""
              }`}
              onClick={() => navigateToSection(1)}
            >
              <span className={style.circle}>◉</span>
              <span>Details</span>
            </button>
            <button
              className={`${style.navButton} ${
                completedSections[2] ? style.active : ""
              }`}
              onClick={() => navigateToSection(2)}
              disabled={!completedSections[1]}
            >
              <span className={style.circle}>◉</span>
              <span>Upload Files</span>
            </button>
          </div>
          <div className={style.sectionContainer}>
            {activeSection === 1 && (
              <Details
                onSubmit={() => handleFormSubmit(1)}
                name={formData.details.name}
                spouseName={formData.details.spouseName}
                salary={formData.details.salary}
                phoneNumber={formData.details.phoneNumber}
                city={formData.details.city}
                onChange={handleInputChange}
              />
            )}

            {activeSection === 2 && (
              <UploadFiles
                onSubmit={() => handleFormSubmit(2)}
                onChange={handleInputChange}
                tinNumber={formData.uploadFiles.tinNumber}
                tinCertificateFile={formData.uploadFiles.tinCertificate}
                nidNumber={formData.uploadFiles.nidNumber}
                bankStatementFile={formData.uploadFiles.bankStatement}
                remittanceFile={formData.uploadFiles.remittance}
                dpsStatementFile={formData.uploadFiles.dpsStatement}
                fdrStatementFile={formData.uploadFiles.fdrStatement}
                lastTaxFilePdf={formData.uploadFiles.lastTaxFile}
                remarks={formData.uploadFiles.remarks}
              />
            )}

            {showPreview && (
              <Preview
                onSubmit={() => handleFormSubmit()}
                closePreviewBtn={handleClosePreview}
                userInfo={{ setData, data, setFormData, formData }}
                previewVisibility={setShowPreview}
                // Details
                name={formData.details.name}
                spouseName={formData.details.spouseName}
                salary={formData.details.salary}
                phoneNumber={formData.details.phoneNumber}
                city={formData.details.city}
                // Files Upload

                tinNumber={formData.uploadFiles.tinNumber}
                tinCertificateFile={formData.uploadFiles.tinCertificate}
                nidNumber={formData.uploadFiles.nidNumber}
                bankStatementFile={formData.uploadFiles.bankStatement}
                remittanceFile={formData.uploadFiles.remittance}
                dpsStatementFile={formData.uploadFiles.dpsStatement}
                fdrStatementFile={formData.uploadFiles.fdrStatement}
                lastTaxFilePdf={formData.uploadFiles.lastTaxFile}
                remarks={formData.uploadFiles.remarks}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxFile;
