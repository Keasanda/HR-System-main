import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddBankingDetail.css'; // Make sure to import your CSS
import Sidebar from "./Sidebar";
import styles from "./AddEmployee.module.css";

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
    <>
      <div className={styles.leftSide}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>

      <div className="justify-content-end form-container">
        <form className="p-4 border rounded bg-light">
          <h3 className="mb-4">Your Banking Details</h3>

          <div className="mb-3">
            <label className="form-label"><strong>Bank Name:</strong></label>
            <select
              value={bankName}
              onChange={(e) => {
                setBankName(e.target.value);
                localStorage.setItem('bankName', e.target.value);
              }}
              className="form-control"
              required
            >
              <option value="" disabled>Select your bank</option>
              <option value="ABSA">ABSA</option>
              <option value="FNB">FNB</option>
              <option value="Standard Bank">Standard Bank</option>
              <option value="Nedbank">Nedbank</option>
              <option value="Capitec">Capitec</option>
              <option value="Other">Other</option>
            </select>
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
            <select
              value={accountType}
              onChange={(e) => {
                setAccountType(e.target.value);
                localStorage.setItem('accountType', e.target.value);
              }}
              className="form-control"
              required
            >
              <option value="" disabled>Select account type</option>
              <option value="Savings">Savings</option>
              <option value="Cheque">Cheque</option>
              <option value="Current">Current</option>
              <option value="Fixed Deposit">Fixed Deposit</option>
            </select>
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

          <button type="button" onClick={() => navigate('/add-employee')} className="btn btn-danger">Back</button>
          <button type="button" onClick={handleNext} className="btn btn-secondary">Next</button>
        </form>
      </div>
    </>
  );
};

export default AddBankingDetail;
