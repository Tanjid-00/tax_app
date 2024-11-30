import React from "react";
import style from "../../../styles/taxfile.module.css";

const Details = ({
  onSubmit,
  onChange,
  name,
  spouseName,
  phoneNumber,
  salary,
  city,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, spouseName, phoneNumber, salary, city };
    onSubmit(formData);
  };

  return (
    <div className={style.detailsForm}>
      <h3>Your Details</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">
          Full Name <span className={style.required}>*</span>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={name}
            onChange={(e) => onChange("details", "name", e.target.value)}
          />
        </label>
        <label htmlFor="spouseName">
          Spouse Name (if any)
          <input
            type="text"
            id="spouseName"
            name="spouseName"
            value={spouseName}
            onChange={(e) => onChange("details", "spouseName", e.target.value)}
          />
        </label>
        <label htmlFor="phone">
          Phone Number <span className={style.required}>*</span>
          <input
            type="number"
            id="phone"
            name="phone"
            value={phoneNumber}
            onChange={(e) => onChange("details", "phoneNumber", e.target.value)}
          />
        </label>
        <label htmlFor="salary">
          Your Salary <span className={style.required}>*</span>
          <input
            type="number"
            id="salary"
            name="salary"
            value={salary}
            onChange={(e) => onChange("details", "salary", e.target.value)}
          />
        </label>
        <label htmlFor="city">
          Your City <span className={style.required}>*</span>
          <select
            name="city"
            id="city"
            value={city}
            onChange={(e) => onChange("details", "city", e.target.value)}
          >
            <option value="">Select your division</option>
            <option value="dhaka">Dhaka</option>
            <option value="chittagong">Chittagong</option>
            <option value="khulna">Khulna</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="sylhet">Sylhet</option>
            <option value="barisal">Barisal</option>
            <option value="rangpur">Rangpur</option>
            <option value="mymensingh">Mymensingh</option>
          </select>
        </label>

        <button className={style.submitBtn} type="submit">
          CONTINUE
        </button>
      </form>
    </div>
  );
};

export default Details;
