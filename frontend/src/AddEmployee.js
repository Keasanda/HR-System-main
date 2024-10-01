import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import styles from "./AddEmployee.module.css";
import Sidebar from "./Sidebar";

const AddEmployee = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    identityNumber: "",
    passportNumber: "",
    dateOfBirth: "",
    gender: "",
    taxNumber: "",
    maritalStatus: "",
    physicalAddress: "",
    postalAddress: "",
    salary: "",
    contractType: "",
    startDate: "",
    endDate: "",
    url: "", // Adding a field for the image URL
    passwordHash: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while image is uploading

    const errors = [];

    if (!formData.name) errors.name = "Name is required.";
    if (!formData.surname) errors.surname = "Surname is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.identityNumber)
      errors.identityNumber = "Identity Number is required.";
    if (!formData.passportNumber)
      errors.passportNumber = "Passport Number is required.";
    if (!formData.taxNumber) errors.taxNumber = "Tax Number is required.";
    if (!formData.salary) errors.salary = "Salary is required.";
    if (!formData.contractType)
      errors.contractType = "Employment Status is required.";
    if (!formData.startDate) errors.startDate = "Start Date is required.";
    if (!formData.physicalAddress)
      errors.physicalAddress = "Physical Address is required.";
    if (!formData.postalAddress)
      errors.postalAddress = "Postal Address is required.";
    if (!formData.passwordHash) errors.passwordHash = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setErrorMessages(errors); // Set field-specific error messages
      return;
    }

    setErrorMessages([]); // Clear previous error messages

    // Step 1: Upload image to Cloudinary
    if (imageSelected) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageSelected);
      uploadFormData.append("upload_preset", "wywylbfz"); // Use your Cloudinary upload preset

      axios
        .post(
          "https://api.cloudinary.com/v1_1/drgxphf5l/image/upload",
          uploadFormData
        )
        .then((response) => {
          const imageUrl = response.data.secure_url;

          // Step 2: Update formData with the uploaded image URL
          setFormData((prevData) => ({
            ...prevData,
            url: imageUrl,
          }));

          // Step 3: Post formData to your backend API after image upload
          return axios.post("http://localhost:5239/api/employee", {
            ...formData,
            url: imageUrl, // Ensure the URL is being sent
          });
        })
        .then((response) => {
          console.log("Data successfully sent to backend:", response.data);
          setImageUrls((prev) => [...prev, formData.url]); // Optionally update imageUrls
          setLoading(false);
          setSuccessMessage("Employee added successfully!");

          // Clear the form
          setFormData({
            name: "",
            surname: "",
            email: "",
            identityNumber: "",
            passportNumber: "",
            dateOfBirth: "",
            gender: "",
            taxNumber: "",
            maritalStatus: "",
            physicalAddress: "",
            postalAddress: "",
            salary: "",
            contractType: "",
            startDate: "",
            endDate: "",
            url: "",
            passwordHash: "",
          });
        })
        .catch((error) => {
          console.error("Error uploading image or sending data:", error);
          setLoading(false); // Reset loading state even if there's an error
        });
    } else {
      // If no image is selected, just submit the form data
      axios
        .post("http://localhost:5239/api/employee", formData)
        .then((response) => {
          console.log("Data successfully sent to backend:", response.data);
          setLoading(false);
          setSuccessMessage("Employee added successfully!");

          // Clear the form
          setFormData({
            name: "",
            surname: "",
            email: "",
            identityNumber: "",
            passportNumber: "",
            dateOfBirth: "",
            gender: "",
            taxNumber: "",
            maritalStatus: "",
            physicalAddress: "",
            postalAddress: "",
            salary: "",
            contractType: "",
            startDate: "",
            endDate: "",
            url: "",
            passwordHash: "",
          });
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          setLoading(false); // Reset loading state
        });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "identityNumber" && value.length === 13) {
      const year = parseInt(value.substring(0, 2), 10);
      const month = parseInt(value.substring(2, 4), 10);
      const day = parseInt(value.substring(4, 6), 10);
      const genderCode = parseInt(value.substring(6, 10), 10);

      // Determine the full year (assuming IDs starting with "00" and later refer to 2000s)
      const currentYear = new Date().getFullYear() % 100;
      const fullYear = year <= currentYear ? 2000 + year : 1900 + year;

      // Format the date for the date input field
      const dateOfBirth = `${fullYear}-${month
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      // Determine gender based on genderCode
      const gender = genderCode < 5000 ? "Female" : "Male";

      setFormData({
        ...formData,
        identityNumber: value,
        dateOfBirth,
        gender,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.leftSide}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>

      <div className={styles.box}>
        <form onSubmit={handleSubmit} className={styles.form}>

 {/* Success message */}
 {successMessage && (
      <div className={styles.successMessage}>{successMessage}</div>
    )}

          {/* Row 1: Name & Surname */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              {errorMessages.name && (
                <div className={styles.errorMessage}>{errorMessages.name}</div>
              )}{" "}
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="surname" className={styles.label}>
                Surname
              </label>
              {errorMessages.surname && (
                <div className={styles.errorMessage}>{errorMessages.surname}</div>
              )}{" "}
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 2: Email & Identity Number */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              {errorMessages.email && (
                <div className={styles.errorMessage}>{errorMessages.email}</div>
              )}{" "}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="identityNumber" className={styles.label}>
                Identity Number
              </label>
              {errorMessages.identityNumber && (
                <div className={styles.errorMessage}>{errorMessages.identityNumber}</div>
              )}{" "}
              <input
                type="text"
                name="identityNumber"
                id="identityNumber"
                placeholder="Identity Number"
                value={formData.identityNumber}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 3: Passport Number & Date of Birth */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Passport Number
              </label>
              {errorMessages.passportNumber && (
                <div className={styles.errorMessage}>{errorMessages.passportNumber}</div>
              )}{" "}
              <input
                type="text"
                name="passportNumber"
                placeholder="Passport Number"
                value={formData.passportNumber}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Date Of Birth
              </label>
              {errorMessages.dateOfBirth && (
                <div className={styles.errorMessage}>{errorMessages.dateOfBirth}</div>
              )}{" "}
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={styles.inputField}
                readOnly
              />
            </div>
          </div>

          {/* Row 4: Gender & Tax Number */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Gender
              </label>
              {errorMessages.gender && (
                <div className={styles.errorMessage}>{errorMessages.gender}</div>
              )}{" "}
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Marital Status
              </label>
              <input
                type="text"
                name="maritalStatus"
                placeholder="Marital Status"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 5: Marital Status & Salary */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Employment Status
              </label>
              {errorMessages.contractType && (
                <div className={styles.errorMessage}>{errorMessages.contractType}</div>
              )}{" "}
              <input
                type="text"
                name="contractType"
                value={formData.contractType}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Tax Number
              </label>
              {errorMessages.taxNumber && (
                <div className={styles.errorMessage}>{errorMessages.taxNumber}</div>
              )}{" "}
              <input
                type="text"
                name="taxNumber"
                placeholder="Tax Number"
                value={formData.taxNumber}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 6: Contract Type & Start Date */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="startDate" className={styles.label}>
                Start Date
              </label>
              {errorMessages.startDate && (
                <div className={styles.errorMessage}>{errorMessages.startDate}</div>
              )}{" "}
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="endDate" className={styles.label}>
                End Date
              </label>
              {errorMessages.endDate && (
                <div className={styles.errorMessage}>{errorMessages.endDate}</div>
              )}{" "}
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Address Rows: Physical and Postal */}
          <div className={styles.addressRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Physical Address
              </label>
              {errorMessages.physicalAddress && (
                <div className={styles.errorMessage}>{errorMessages.physicalAddress}</div>
              )}{" "}
              <input
                type="text"
                name="physicalAddress"
                placeholder="Physical Address"
                value={formData.physicalAddress}
                onChange={handleInputChange}
                className={styles.longinputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Postal Address
              </label>
              {errorMessages.postalAddress && (
                <div className={styles.errorMessage}>{errorMessages.postalAddress}</div>
              )}{" "}
              <input
                type="text"
                name="postalAddress"
                placeholder="Postal Address"
                value={formData.postalAddress}
                onChange={handleInputChange}
                className={styles.longinputField}
              />
            </div>
          </div>
          {/* Salary Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Salary
            </label>
            {errorMessages.salary && (
                <div className={styles.errorMessage}>{errorMessages.salary}</div>
              )}{" "}
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>

          {/* Password Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            {errorMessages.passwordHash && (
                <div className={styles.errorMessage}>{errorMessages.passwordHash}</div>
              )}{" "}
            <input
              type="passwordHash"
              name="passwordHash"
              placeholder="Password"
              value={formData.passwordHash}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>

          {/* File upload */}
          <div className={styles.uploadContainer}>
            <label htmlFor="fileUpload" className={styles.customFileUpload}>
              <i className="fas fa-cloud-upload-alt"></i>{" "}
              {/* Font Awesome Cloud Icon */}
              <span>Upload Image</span>
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={(event) => setImageSelected(event.target.files[0])}
              className={styles.fileInput}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={styles.uploadButton}
          >
            {loading ? "Submitting..." : "Add Employee"}
          </button>
        </form>

        {/* Display uploaded images */}
        <div className={styles.imageContainer}>
          {imageUrls.map((url, index) => (
            <Image
              key={index}
              className={styles.uploadedImage}
              cloudName="drgxphf5l"
              publicId={url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
