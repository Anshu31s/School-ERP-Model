import React, { useState } from 'react';
import axios from 'axios';
import useCsrfToken from './utils/csrf';
import { teacherSchema } from './utils/teacherSchema';

const formFields = [
  { label: 'Name', name: 'name', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Date of Birth', name: 'dob', type: 'date', required: true },
  {
    label: 'Gender',
    name: 'gender',
    type: 'select',
    options: ['male', 'female', 'other'],
    required: true
  },
  {
    label: 'Blood Group',
    name: 'blood',
    type: 'select',
    options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  { label: 'Mobile', name: 'mobile', type: 'text', required: true },
  { label: 'Father\'s Name', name: 'father_name', type: 'text', required: true },
  { label: 'Mother\'s Name', name: 'mother_name', type: 'text', required: true },
  { label: 'Father\'s Mobile', name: 'father_mobile', type: 'text', required: true },
  { label: 'Mother\'s Mobile', name: 'mother_mobile', type: 'text', required: true },
  { label: 'Current Address', name: 'current_address', type: 'textarea', required: true },
];

const RegisterTeacher = () => {
  const csrfToken = useCsrfToken();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState(() =>
    formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // Validate form data
    const validationResult = teacherSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/utils/register-teacher', formData, {
        headers: {
          'CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });

      const { success, message } = response.data;
      if (success) {
        alert(message);

        setFormData(() =>
          formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.error);
      } else {
        setErrors({ form: ['Server error. Please try again later.'] });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register Teacher</h2>

      {/* General form errors */}
      {errors.form && (
        <div className="text-red-500 mb-4">
          {errors.form.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`border p-2 w-full ${errors[field.name] ? 'border-red-500' : ''}`}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`border p-2 w-full ${errors[field.name] ? 'border-red-500' : ''}`}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`border p-2 w-full ${errors[field.name] ? 'border-red-500' : ''}`}
                />
              )}

              {/* Display field-specific errors */}
              {errors[field.name] && <p className="text-red-500 mt-1">{errors[field.name]}</p>}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterTeacher;
