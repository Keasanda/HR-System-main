import React, { useState } from 'react';
import axios from 'axios';

const BankingDetail = ({ onSuccess }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [error, setError] = useState('');

  // Retrieve userID from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const appUserId = user?.userID; // Assuming 'userID' is stored as userID

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5239/api/bankingdetail', {
        appUserId, // Use the retrieved userID as AppUserId
        bankName,
        accountNumber,
        accountType,
        branchCode,
      });
      onSuccess(response.data); // Call a success handler passed as a prop
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while saving banking details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <div>
        <label>Bank Name:</label>
        <input value={bankName} onChange={(e) => setBankName(e.target.value)} required />
      </div>
      <div>
        <label>Account Number:</label>
        <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
      </div>
      <div>
        <label>Account Type:</label>
        <input value={accountType} onChange={(e) => setAccountType(e.target.value)} required />
      </div>
      <div>
        <label>Branch Code:</label>
        <input value={branchCode} onChange={(e) => setBranchCode(e.target.value)} required />
      </div>
      <button type="submit">Submit Banking Details</button>
    </form>
  );
};

export default BankingDetail;
