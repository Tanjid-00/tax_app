import React from "react";
import axios from "axios";
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
  const { formData } = userInfo;

  // setData, data, setFormData,

  // const handleSubmit = () => {
  //   setData(data);
  //   setFormData(formData);
  //   previewVisibility(false);
  //   console.table(formData);
  //   alert("Submission successful");
  // };

  // send form data by multer

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // টেক্সট ডেটা অ্যাড করা
      formDataToSend.append("details", JSON.stringify(formData.details));
      formDataToSend.append(
        "uploadFiles",
        JSON.stringify(formData.uploadFiles)
      );

      // ফাইল ডেটা অ্যাড করা
      const { uploadFiles } = formData;
      if (uploadFiles.bankStatement)
        formDataToSend.append("bankStatement", uploadFiles.bankStatement);
      if (uploadFiles.remittance)
        formDataToSend.append("remittance", uploadFiles.remittance);
      if (uploadFiles.dpsStatement)
        formDataToSend.append("dpsStatement", uploadFiles.dpsStatement);
      if (uploadFiles.fdrStatement)
        formDataToSend.append("fdrStatement", uploadFiles.fdrStatement);
      if (uploadFiles.lastTaxFile)
        formDataToSend.append("lastTaxFile", uploadFiles.lastTaxFile);

      // API রিকোয়েস্ট
      // নতুন Axios কল (credentials সাপোর্ট সহ)
      const response = await axios.post(
        "http://localhost:8080/api/tax/submit",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ফর্ম ডেটার জন্য সঠিক হেডার
          },
          withCredentials: true, // credentials সাপোর্ট যোগ করুন
        }
      );

      alert(response.data.message); // সফল সাবমিশন মেসেজ দেখান
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Please try again.");
    }

    // প্রিভিউ বন্ধ করা
    previewVisibility(false);
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
