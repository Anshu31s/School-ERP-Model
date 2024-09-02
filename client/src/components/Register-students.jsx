import React, {useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useCsrfToken from './auth/csrf';

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    blood: '',
    mobile: '',
    father_name: '',
    mother_name: '',
    father_mobile: '',
    mother_mobile: '',
    current_address: '',
  });
  const csrfToken = useCsrfToken();
  const Navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register-student', formData, {
        headers: {
          'CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });

      const { success, message ,userId} = response.data;
      if (success) {
        Navigate('/');
        console.log('message', message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.error);
      } else {
        setErrors(['Server error. Please try again later.']);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register Student</h2>
      {errors.length > 0 && (
        <div className="text-red-500 mb-4">
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Blood Group</label>
          <select
            name="blood"
            value={formData.blood}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Father's Name</label>
          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Mother's Name</label>
          <input
            type="text"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Father's Mobile</label>
          <input
            type="text"
            name="father_mobile"
            value={formData.father_mobile}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Mother's Mobile</label>
          <input
            type="text"
            name="mother_mobile"
            value={formData.mother_mobile}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Current Address</label>
          <textarea
            name="current_address"
            value={formData.current_address}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
