import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/protected/getuser', {
                    withCredentials: true,
                });
                const { student, teacher } = response.data;
                setProfile(student || teacher);
            } catch (error) {
                console.error('Error fetching the user profile:', error);
                setError('Failed to load user profile');
            }
        };
        fetchProfile();
    }, []);

    if (error) {
        console.error('Error fetching the user profile:', error);
    }
    if (!profile) {
        return <div>Loading...</div>;
    }
    return (
        <div className="h-full p-8">
            <div className="bg-white rounded-lg shadow-xl pb-8">
                <div className="absolute right-12 mt-4 rounded">
                    <div className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl hidden">
                        <div className="py-2 border-b">
                            <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                <span className="text-sm text-gray-700">Edit</span>
                            </button>
                        </div>
                        <div className="py-2">
                            <p className="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                            <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                                    </path>
                                </svg>
                                <span className="text-sm text-gray-700">Report</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-64">
                    <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                        className="w-full h-full object-cover rounded-t-lg" />
                </div>
                <div className="flex flex-col items-center -mt-20">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                        className="w-40 border-4 border-white rounded-full" />
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl capitalize">
                            {profile.name}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        {profile.userId}
                    </p>
                </div>
            </div>

            <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                        <ul className="mt-2 text-gray-700">
                            <li className="flex border-y py-2">
                                <span className="font-bold w-24">Name:</span>
                                <span className="text-gray-700">
                                    {profile.name}
                                </span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Birthday:</span>
                                <span className="text-gray-700">
                                    {profile.dob}
                                </span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Gender:</span>
                                <span className="text-gray-700">
                                    {profile.gender}
                                </span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Joined:</span>
                                <span className="text-gray-700">
                                    {new Date(profile.createdAt).toLocaleDateString()}
                                </span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Mobile:</span>
                                <span className="text-gray-700">
                                    {profile.mobile}
                                </span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24">Email:</span>
                                <span className="text-gray-700">
                                    {profile.email}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">About</h4>
                        <p className="mt-2 text-gray-700">
                            {profile.about}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
