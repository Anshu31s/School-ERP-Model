import React, { useState } from "react";
import axios from "axios";

const Forgetpassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendEmail(email);
            setSuccess("Password reset link sent successfully!");
            setError(null);
        } catch (err) {
            setError("Failed to send password reset link.");
            setSuccess(null);
        }
    };

    const sendEmail = async (email) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/forget-password",
                { email },
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            throw error;
        }
    };

    return (
        <section className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 w-full max-w-md relative">
                <div className="text-center">
                    <h1 className="mb-2">Reset your password</h1>
                    <p className="text-sm">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="text-green-500 text-center mb-4">
                        {success}
                    </div>
                )}
                <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium  ">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 ext-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2 "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center "
                    >
                        Reset password
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Forgetpassword;
