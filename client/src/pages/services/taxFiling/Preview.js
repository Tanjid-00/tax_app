import React, { useState } from "react";
import style from "../../../styles/taxfile.module.css";

const Preview = ({
  name,
  spouseName,
  salary,
  phoneNumber,
  city,
  tinNumber,
  nidNumber,
  // pdf files
  bankStatementFile,
  fdrStatementFile,
  remittanceFile,
  dpsStatementFile,
  lastTaxFilePdf,
  remarks,
  closePreviewBtn,
  previewVisibility,
  onSubmit, // Add onSubmit prop for submission

  userInfo,
}) => {
  const { setData, data, setFormData, formData } = userInfo;

  const handleSubmit = () => {
    setData(data);
    setFormData(formData);
    previewVisibility(false);
    console.table(formData);
    alert("Submission successful");
  };

  return (
    <div className={style.previewPage}>
      <div className={style.previewModal}>
        <div>
          <h4>Preview Your Information</h4>
          <button onClick={closePreviewBtn}>✖</button>
        </div>

        <div>
          <table className={style.detailsTable}>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>Spouse Name:</td>
                <td>{spouseName}</td>
              </tr>
              <tr>
                <td>Salary:</td>
                <td>{salary}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{phoneNumber}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{city}</td>
              </tr>
              <tr>
                <td>NID Number:</td>
                <td>{nidNumber}</td>
              </tr>
              <tr>
                <td>TIN Number:</td>
                <td>{tinNumber}</td>
              </tr>

              {/* Files */}
              <tr>
                <td>Bank Statement:</td>
                <td>
                  {bankStatementFile
                    ? bankStatementFile.name
                    : "No file uploaded"}
                </td>
              </tr>

              <tr>
                <td>DPS Statement:</td>
                <td>
                  {dpsStatementFile
                    ? dpsStatementFile.name
                    : "No file uploaded"}
                </td>
              </tr>
              <tr>
                <td>FDR Statement:</td>
                <td>
                  {fdrStatementFile
                    ? fdrStatementFile.name
                    : "No file uploaded"}
                </td>
              </tr>
              <tr>
                <td>Remittance:</td>
                <td>
                  {remittanceFile ? remittanceFile.name : "No file uploaded"}
                </td>
              </tr>
              <tr>
                <td>Last Tax File:</td>
                <td>
                  {lastTaxFilePdf ? lastTaxFilePdf.name : "No file uploaded"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button className={style.submitBtn} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
