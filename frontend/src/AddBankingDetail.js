import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeDetailsCSS from "./EmployeeDetails.module.css";



const AddBankingDetail = ({ onSuccess }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [error, setError] = useState('');
  const [appUserId, setAppUserId] = useState('');

  // Retrieve user ID from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user?.userID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userID) {
      alert('No user ID found in local storage.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5239/api/BankingDetail', {
        appUserId: userID,
        bankName,
        accountNumber,
        accountType,
        branchCode,
        appUserId
      });

      // Handle successful response
      onSuccess(response.data);
      alert('Banking details added successfully');
      // Reset form fields
      setBankName('');
      setAccountNumber('');
      setAccountType('');
      setBranchCode('');
      setAppUserId('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while adding banking details.');
    }
  };

  return (
    <div className={EmployeeDetailsCSS.container}>
      <h3>Add Banking Details</h3>
      {error && <div className={EmployeeDetailsCSS.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>

        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>


        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>appUserId</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAppUserId(e.target.value)}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>


        

        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>Account Type</label>
          <input
            type="text"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>

        <div className={EmployeeDetailsCSS.inputGroup}>
          <label>Branch Code</label>
          <input
            type="text"
            value={branchCode}
            onChange={(e) => setBranchCode(e.target.value)}
            className={EmployeeDetailsCSS.inputField}
            required
          />
        </div>

        <button type="submit" className={EmployeeDetailsCSS.submitButton}>
          Add Banking Details
        </button>
      </form>
    </div>
  );
};

export default AddBankingDetail;
