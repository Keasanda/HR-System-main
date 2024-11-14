import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    navigate('/qualifications');
  };

  return (
    <div className="">
      <form>
        <h3>Your Banking Details</h3>
        <div className="">
          <div className="">
            <p><strong>Bank Name:</strong></p>
            <input
              type="text"
              value={bankName}
              onChange={(e) => {
                setBankName(e.target.value);
                localStorage.setItem('bankName', e.target.value);
              }}
              className=""
              required
            />
          </div>

          <div className="">
            <p><strong>Account Number:</strong></p>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                localStorage.setItem('accountNumber', e.target.value);
              }}
              className=""
              required
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <p><strong>Account Type:</strong></p>
            <input
              type="text"
              value={accountType}
              onChange={(e) => {
                setAccountType(e.target.value);
                localStorage.setItem('accountType', e.target.value);
              }}
              className=""
              required
            />
          </div>

          <div className="">
            <p><strong>Branch Code:</strong></p>
            <input
              type="text"
              value={branchCode}
              onChange={(e) => {
                setBranchCode(e.target.value);
                localStorage.setItem('branchCode', e.target.value);
              }}
              className=""
              required
            />
          </div>
        </div>

        <button type="submit" className="">
          Add Banking Details
        </button>

        <button onClick={handleNext} className="">
          Back
        </button>
      </form>
    </div>
  );
};

export default AddBankingDetail;
