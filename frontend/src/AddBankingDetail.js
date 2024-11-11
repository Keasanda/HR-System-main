import React, { useState } from "react";
import axios from "axios";
import EmployeeDetailsCSS from "./EmployeeDetails.module.css";
import { useNavigate } from "react-router-dom";

const AddBankingDetail = ({ onSuccess }) => {
  const [bankName, setBankName] = useState(localStorage.getItem('bankName') || '');
  const [accountNumber, setAccountNumber] = useState(localStorage.getItem('accountNumber') || '');
  const [accountType, setAccountType] = useState(localStorage.getItem('accountType') || '');
  const [branchCode, setBranchCode] = useState(localStorage.getItem('branchCode') || '');
  const [error, setError] = useState('');
  const [appUserId, setAppUserId] = useState('');
  const navigate = useNavigate();
  // Retrieve user ID from local storage (assuming you have a separate mechanism)
  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user?.userID;

  const handleFormSubmit = async (e) => {
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
      });

      // Handle successful response
      onSuccess(response.data);
      alert('Banking details added successfully');

      // Clear local storage (optional, consider user experience)
      localStorage.removeItem('bankName');
      localStorage.removeItem('accountNumber');
      localStorage.removeItem('accountType');
      localStorage.removeItem('branchCode');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while adding banking details.');
    }
  };

  const handleNext = () => {
   
    navigate('/add-employee'); // Previous approach (optional)
  };


  return (
    <div className={EmployeeDetailsCSS.container}>
      <h3>Add Banking Details</h3>
      {error && <div className={EmployeeDetailsCSS.error}>{error}</div>}
      <form onSubmit={handleFormSubmit}>
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
