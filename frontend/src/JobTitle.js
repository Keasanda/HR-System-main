import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import styles from "./JobTitle.module.css";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const JobTitle = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leaveDays, setLeaveDays] = useState({ annualLeave: 0, sickLeave: 0 });
  const [formData, setFormData] = useState({
    maritalStatus: "",
    contractType: "", // Add more fields as needed
  });

  const leavePolicies = {
    juniorToMidLevel: {
      annualLeave: 15,
      sickLeave: 5,
    },
    midLevelToSenior: {
      annualLeave: 20,
      sickLeave: 10,
    },
    cLevelOrExecutive: {
      annualLeave: 30,
      sickLeave: 10,
    },
  };

  const getLeaveDays = (grade) => {
    switch (grade) {
      case "Junior to mid-level":
        return leavePolicies.juniorToMidLevel;
      case "Mid-level to Senior Level":
        return leavePolicies.midLevelToSenior;
      case "C-Level or Executive Level":
        return leavePolicies.cLevelOrExecutive;
      default:
        return { annualLeave: 0, sickLeave: 0 };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = [];

    // Add your validation logic here if necessary

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setErrorMessages(errors);
      return;
    }

    setErrorMessages([]);

    // Add your submission logic here

    setLoading(false); // Set loading to false after submission
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update leave days based on job grade selection
    if (name === "contractType") {
      const leave = getLeaveDays(value);
      setLeaveDays(leave);
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.leftSide}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.pageTitle}>Job Information</h2>
      </div>

      <div className={styles.box}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="maritalStatus" className={styles.label}>
                JOB TITLE
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className={styles.inputField}
              >
                <option value="">Select Job Title</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Software Tester">Software Tester</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="UI/UX Developer">UI/UX Developer</option>
                <option value="Admin/HR">Admin/HR</option>
                <option value="CEO">CEO (Chief Executive Officer)</option>
                <option value="COO">COO (Chief Operating Officer)</option>
                <option value="CFO">CFO (Chief Financial Officer)</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="contractType" className={styles.label}>
                Job Grade
              </label>
              {errorMessages.contractType && (
                <div className={styles.errorMessage}>
                  {errorMessages.contractType}
                </div>
              )}
              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleInputChange}
                className={styles.inputField}
              >
                <option value="">Select Job Grade</option>
                <option value="C-Level or Executive Level">
                  C-Level or Executive Level
                </option>
                <option value="Mid-level to Senior Level">
                  Mid-level to Senior Level (Grade 6–8)
                </option>
                <option value="Junior to mid-level">
                  Junior to mid-level (Grade 3–5)
                </option>
              </select>
            </div>
          </div>

          {/* Leave Days Display */}
          <div className={styles.leaveDaysContainer}>
            {leaveDays.annualLeave > 0 && (
              <div className={styles.leaveDays}>
                <span className={styles.leaveLabel}>
                  Annual Leave: 
                </span>
                <span className={styles.leaveValue}>
                  {leaveDays.annualLeave} days
                </span>
                <span className={styles.leaveLabel}>
                  | Sick Leave: 
                </span>
                <span className={styles.leaveValue}>
                  {leaveDays.sickLeave} days
                </span>
              </div>
            )}
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobTitle;
