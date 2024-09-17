import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCsrfToken from './auth/csrf';
import { studentSchema } from './studentSchema';

const RegisterStudent = () => {
  const csrfToken = useCsrfToken();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'Class', label: 'Class', type: 'select', options: ['9', '10', '11', '12'] },
    { name: 'gender', label: 'Gender', type: 'select', options: ['male', 'female', 'other'] },
    { name: 'blood', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    { name: 'mobile', label: 'Mobile', type: 'number', placeholder: 'Enter mobile number' },
    { name: 'father_name', label: 'Father\'s Name', type: 'text', placeholder: 'Enter father\'s name' },
    { name: 'mother_name', label: 'Mother\'s Name', type: 'text', placeholder: 'Enter mother\'s name' },
    { name: 'father_mobile', label: 'Father\'s Mobile', type: 'number', placeholder: 'Enter father\'s mobile' },
    { name: 'mother_mobile', label: 'Mother\'s Mobile', type: 'number', placeholder: 'Enter mother\'s mobile' },
    { name: 'current_address', label: 'Current Address', type: 'textarea', placeholder: 'Enter current address' },
  ];

  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      const paymentResponse = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: 500,
      });

      const options = {
        key: 'rzp_test_p3VY80Mx9dIilM',
        amount: 50000,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Account Creation Fee',
        order_id: paymentResponse.data.order.id,
        callback_url: 'http://localhost:3000/api/payment/verify-payment',

        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          try {
            // Send form data to backend
            await axios.post('http://localhost:5000/api/auth/register-student', {
              ...formData,
            }, {
              headers: {
                'CSRF-Token': csrfToken,
              },
              withCredentials: true,
            });

            // Send payment details to backend
            await axios.post('http://localhost:5000/api/payment/register-payment', {
              paymentId: razorpay_payment_id,
              orderId: razorpay_order_id,
              signature: razorpay_signature,
              name: formData.name,
              email: formData.email,
              mobile: formData.mobile
            });

            alert('Registration successful!');
            navigate('/');
            setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
          } catch (error) {
            console.error('Error saving form data or payment details:', error);
            alert('Registration failed. Please try again.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const validationResult = studentSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Trigger payment process
    handlePayment();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register Student</h2>

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

export default RegisterStudent;
