import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Qualifications';
import Sidebar from "./Sidebar";
import styles from "./AddEmployee.module.css";


const Qualifications = () => {
  const [qualificationType, setQualificationType] = useState(localStorage.getItem('qualificationType') || '');
  const [yearCompleted, setYearCompleted] = useState(localStorage.getItem('yearCompleted') || '');
  const [institution, setInstitution] = useState(localStorage.getItem('institution') || '');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('qualificationType', qualificationType);
    localStorage.setItem('yearCompleted', yearCompleted);
    localStorage.setItem('institution', institution);
  }, [qualificationType, yearCompleted, institution]);

  const handleSubmit = async () => {
    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    formData.qualificationType = qualificationType;
    formData.yearCompleted = new Date(yearCompleted).toISOString();
    formData.institution = institution;
    localStorage.setItem("formData", JSON.stringify(formData));

    const completeFormData = {
      employeeDto: { ...formData },
    };

    try {
      await axios.post("http://localhost:5239/api/employee", completeFormData);
      alert("All data submitted successfully!");
      localStorage.removeItem("formData");
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response && error.response.data) {
        console.error("Validation errors:", error.response.data.errors);
      }
    }
  };

  return (

    <>
    <div className={styles.leftSide}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
    </div>

    <div className="form-container">
      <form className="p-4 border rounded">
        <h2 className="mb-4">Qualifications</h2>
        <div className="mb-3">
          <label className="form-label"><strong>Qualification Type:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Qualification Type"
            value={qualificationType}
            onChange={(e) => setQualificationType(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Year Completed:</strong></label>
          <input
            type="date"
            className="form-control"
            value={yearCompleted}
            onChange={(e) => setYearCompleted(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Institution:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
          />
        </div>

        <button type="button" onClick={handleSubmit} className="btn btn-primary me-2">Home</button>
        <button type="button" onClick={() => navigate('/job-title')} className="btn btn-secondary">next</button>
      </form>
    </div>

    </>
  );
};

export default Qualifications;
