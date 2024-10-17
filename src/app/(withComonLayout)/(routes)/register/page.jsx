"use client"
import useRouterHook from '@/app/hooks/useRouterHook';
import useValidationStateHook from '@/app/hooks/useValidationStateHook';
import SocialAuth from '@/components/Shared/SocialAuth';
import { postNewUser } from '@/requests/post';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';
import { IoEye, IoEyeOff } from "react-icons/io5";
import '../../../../components/Shared/CustomCSS/style.css';
import useShowPassState from '@/app/hooks/useShowPassState';
import useShowConfimPass from '@/app/hooks/useShowConfimPass';

const img_hosting_key = process.env.NEXT_PUBLIC_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Register = () => {
    const router = useRouterHook();
    const [showPass, setShowPass] = useShowPassState();
    const [showConfirmPass, setShowConfirmPass] = useShowConfimPass();
    const [validState, setValidState] = useValidationStateHook();

    // validation related all errors 
    let nameErr = "Your name is required!";
    let emailErr = "Please enter a valid email!";
    let passErr = "Should be at least 6 characters.";
    let matchedPassErr = "Passwords do not match!";
    let fillErr = "Upload your profile picture!";

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset state
        setValidState("");

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;
        const profileImgFill = form.my_profile.files[0];

        // check valid email using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Form validation
        if (!name && !email && !password && !confirm_password && !profileImgFill) {
            setValidState("Please fill out all fields!");
            return;
        } else if (!name) {
            setValidState(nameErr);
            return;
        } else if (!email || !emailRegex.test(email)) {
            setValidState(emailErr);
            return;
        } else if (!password || password.length < 6) {
            setValidState(passErr);
            return;
        } else if (password !== confirm_password) {
            setValidState(matchedPassErr);
            return;
        } else if (!profileImgFill) {
            setValidState(fillErr);
        }

        try {
            // upload image to imgbb and get the url
            const formData = new FormData();
            formData.append("image", profileImgFill);
            const imgRes = await axios.post(img_hosting_api, formData);
            const profile = imgRes?.data?.data?.display_url;
            console.log(profile);

            // new user info 
            const newUser = { name, email, password, profile };
            let successfull = false;

            // sending request with newUser data to backend and then to Database if condition satisfy  
            const response = await postNewUser(newUser);
            console.log(response);
            if (response.status === 200) {
                successfull = true;
            }

            // show successful / failed sweet alert 
            if (successfull) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        popup: 'popup-successful',
                    }
                });
                e.target.reset();
                router.push('/');
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Already registered!",
                    customClass: {
                        popup: 'popup-failed',
                        confirmButton: 'confirmButton-failed'
                    }
                });
                e.target.reset();
            }

        } catch (error) {
            console.error('registration error', error);
        }
    }

    return (
        <div className='flex pt-10 min-h-screen justify-center items-center h-screen bg-white'>
            <div className='w-full max-w-md bg-white p-4 rounded-lg shadow-md'>
                <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>Register Now!</h2>
                <form onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='w-full md:w-1/2 flex flex-col'>
                                <label className='text-sm font-semibold text-gray-600'>Name</label>
                                <input type="text" name="name" className='py-2 px-4 border rounded-lg' placeholder="Your full name" />
                                {validState === nameErr && <p className='text-red-500 font-semibold'>{validState}</p>}
                            </div>
                            <div className='w-full md:w-1/2 flex flex-col'>
                                <label className='text-sm font-semibold text-gray-600'>Email</label>
                                <input type="email" name="email" className='py-2 px-4 border rounded-lg' placeholder="Your email" />
                                {validState === emailErr && <p className='text-red-500 font-semibold'>{validState}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='w-full md:w-1/2 flex flex-col relative'>
                                <label className='text-sm font-semibold text-gray-600'>Password</label>
                                <input type={showPass ? "text" : "password"} name="password" className='py-2 px-4 border rounded-lg' placeholder="Password" />
                                <span onClick={() => setShowPass(!showPass)} className='absolute mt-4 inset-y-0 right-4 flex items-center text-xl cursor-pointer'>{showPass ? <IoEyeOff /> : <IoEye />}</span>
                                {validState === passErr && <p className='text-red-500 font-semibold'>{validState}</p>}
                            </div>
                            <div className='w-full md:w-1/2 flex flex-col relative'>
                                <label className='text-sm font-semibold text-gray-600'>Confirm Password</label>
                                <input type={showConfirmPass ? "text" : "password"} name="confirm_password" className='py-2 px-4 border rounded-lg' placeholder="Confirm password" />
                                <span onClick={() => setShowConfirmPass(!showConfirmPass)} className='absolute mt-4 inset-y-0 right-4 flex items-center text-xl cursor-pointer'>{showConfirmPass ? <IoEyeOff /> : <IoEye />}</span>
                                {validState === matchedPassErr && <p className='text-red-500 font-semibold'>{validState}</p>}
                            </div>
                        </div>
                        <div className='w-full flex flex-col mb-6'>
                            <label className='text-sm font-semibold text-gray-600'>Upload Profile</label>
                            <input type="file" name="my_profile" className='py-2 px-4 border rounded-lg' />
                            {validState === fillErr && <p className='text-red-500 font-semibold'>{validState}</p>}
                        </div>
                        <button className='btn bg-purple-500 text-white text-lg mt-6  w-full py-2 rounded-lg'>Register</button>
                        {validState === "Please fill out all fields!" && <p className='text-red-500 mt-2 text-center font-semibold'>{validState}</p>}
                    </div>
                </form>
                <div className='mt-2'><SocialAuth /></div>
                <p className='mt-4 font-medium text-center'>Already have an account? <Link href={'/login'} className='text-purple-500'>Please Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
