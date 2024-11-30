import React, { useState } from "react";
import style from "../../../styles/taxfile.module.css";

const UploadFiles = ({
  onSubmit,
  onChange,
  tinNumber,
  nidNumber,
  bankStatementFile,
  remittanceFile,
  dpsStatementFile,
  fdrStatementFile,
  lastTaxFilePdf,
  remarks,
}) => {
  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      onChange("uploadFiles", field, file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleInputChange = (field, e) => {
    onChange("uploadFiles", field, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const [showTaxFilingInput, setShowTaxFilingInput] = useState(false);
  const handleCheckboxChange = (e) => {
    setShowTaxFilingInput(e.target.value === "yes");
  };

  return (
    <div className={style.uploadFilesForm}>
      <h3>Upload Files</h3>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        {/* Nid number */}

        <label htmlFor="nidNumber">
          NID Number <span className={style.required}>*</span>
          <input
            type="number"
            id="nidNumber"
            value={nidNumber}
            onChange={(e) => handleInputChange("nidNumber", e)}
          />
        </label>

        <label htmlFor="tinNumber">
          TIN Number <span className={style.required}>*</span>
          {/* <p> Lorem ipsum dolor sit.</p> */}
          <input
            type="number"
            id="tinNumber"
            value={tinNumber}
            onChange={(e) => handleInputChange("tinNumber", e)}
          />
        </label>

        {/* Bank Statement */}
        <label htmlFor="bankStatement">
          Bank Statement (pdf) <span className={style.required}>*</span>
          <input
            type="file"
            id="bankStatement"
            accept="application/pdf"
            name={bankStatementFile}
            onChange={(e) => handleFileChange("bankStatement", e)}
          />
          {bankStatementFile && (
            <p className={style.filePreview}>📂 {bankStatementFile.name}</p>
          )}
        </label>

        {/* Other File Uploads */}
        <label htmlFor="dpsStatement">
          DPS Statement (pdf)
          <input
            type="file"
            id="dpsStatement"
            accept="application/pdf"
            onChange={(e) => handleFileChange("dpsStatement", e)}
          />
          {dpsStatementFile && (
            <p className={style.filePreview}>📂 {dpsStatementFile.name}</p>
          )}
        </label>

        <label htmlFor="fdrStatement">
          FDR Statement (pdf)
          <input
            type="file"
            id="fdrStatement"
            accept="application/pdf"
            onChange={(e) => handleFileChange("fdrStatement", e)}
          />
          {fdrStatementFile && (
            <p className={style.filePreview}>📂 {fdrStatementFile.name}</p>
          )}
        </label>

        <label htmlFor="remittance">
          Remittance (pdf)
          <input
            type="file"
            id="remittance"
            accept="application/pdf"
            onChange={(e) => handleFileChange("remittance", e)}
          />
          {remittanceFile && (
            <p className={style.filePreview}>📂 {remittanceFile.name}</p>
          )}
        </label>

        <div className={style.check}>
          <h4>Have you paid tax last year?</h4>
          <label>
            <input
              type="radio"
              name="lastTaxPaid"
              value="yes"
              onChange={handleCheckboxChange}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="lastTaxPaid"
              value="no"
              onChange={handleCheckboxChange}
            />
            No
          </label>
        </div>

        {showTaxFilingInput && (
          <label htmlFor="lastTaxFile">
            Last Tax File (pdf) <span className={style.required}>*</span>
            <input
              type="file"
              id="lastTaxFile"
              accept="application/pdf"
              onChange={(e) => handleFileChange("lastTaxFile", e)}
            />
            {lastTaxFilePdf && (
              <p className={style.filePreview}>📂 {lastTaxFilePdf.name}</p>
            )}
          </label>
        )}

        <label htmlFor="remarks">
          Remarks
          <textarea
            name="remarks"
            id="remarks"
            placeholder="Add any specific details or instruction for your tax filing here"
            value={remarks}
            onChange={(e) => handleInputChange("remarks", e)}
          ></textarea>
        </label>

        <button className={style.submitBtn} type="submit">
          CONTINUE
        </button>
      </form>
    </div>
  );
};

export default UploadFiles;
