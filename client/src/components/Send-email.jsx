import React, { useState } from "react";

const Sendemail = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen flex flex-col justify-center items-center">
            <div className="w-1/4">
                <div className="text-center text-white">
                    <h1 className="mb-2">Reset your password</h1>
                    <p className="text-sm">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>
                <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Reset password
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Sendemail;
