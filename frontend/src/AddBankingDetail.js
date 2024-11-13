import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeDetailsCSS from "./EmployeeDetails.module.css";

const AddBankingDetail = () => {
  const [bankName, setBankName] = useState(localStorage.getItem('bankName') || '');
  const [accountNumber, setAccountNumber] = useState(localStorage.getItem('accountNumber') || '');
  const [accountType, setAccountType] = useState(localStorage.getItem('accountType') || '');
  const [branchCode, setBranchCode] = useState(localStorage.getItem('branchCode') || '');
  const navigate = useNavigate();

  const handleNext = () => {
    const existingFormData = JSON.parse(localStorage.getItem("formData")) || {};
    const updatedFormData = {
      ...existingFormData,
      bankName,
      accountNumber,
      accountType,
      branchCode,
    };
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    navigate('/qualifications') ;
  };

  return (
    <div className={EmployeeDetailsCSS.container}>
      <h3>Add Banking Details</h3>
   
      <form >
        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => {
              setBankName(e.target.value);
              localStorage.setItem('bankName', e.target.value);
            }}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>

        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              localStorage.setItem('accountNumber', e.target.value);
            }}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>

        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>Account Type</label>
          <input
            type="text"
            value={accountType}
            onChange={(e) => {
              setAccountType(e.target.value);
              localStorage.setItem('accountType', e.target.value);
            }}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>

        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>Branch Code</label>
          <input
            type="text"
            value={branchCode}
            onChange={(e) => {
              setBranchCode(e.target.value);
              localStorage.setItem('branchCode', e.target.value);
            }}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>

        <button type="submit" className={EmployeeDetailsCSS.submitButton}>
          Add Banking Details
        </button>
      </form>

  {/* existing form code... */}
  <button onClick={handleNext} className={EmployeeDetailsCSS.backButton}>
        Back
      </button>


    </div>


    


  );
};

export default AddBankingDetail;
