import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddBankingDetail';

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
    <div className="form-container">
      <form className="p-4 border rounded">
        <h3 className="mb-4">Your Banking Details</h3>
        <div className="mb-3">
          <label className="form-label"><strong>Bank Name:</strong></label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => {
              setBankName(e.target.value);
              localStorage.setItem('bankName', e.target.value);
            }}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Account Number:</strong></label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              localStorage.setItem('accountNumber', e.target.value);
            }}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Account Type:</strong></label>
          <input
            type="text"
            value={accountType}
            onChange={(e) => {
              setAccountType(e.target.value);
              localStorage.setItem('accountType', e.target.value);
            }}
            className="form-control"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label"><strong>Branch Code:</strong></label>
          <input
            type="text"
            value={branchCode}
            onChange={(e) => {
              setBranchCode(e.target.value);
              localStorage.setItem('branchCode', e.target.value);
            }}
            className="form-control"
            required
          />
        </div>

        <button type="button" onClick={() => navigate('/add-employee')} className="btn btn-Danger">Back</button>
        <button type="button" onClick={handleNext} className="btn btn-secondary">
          Next
        </button>
      </form>
    </div>
  );
};

export default AddBankingDetail;
