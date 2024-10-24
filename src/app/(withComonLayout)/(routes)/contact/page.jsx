"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import emailjs from "@emailjs/browser";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const templateParams = {
      from_name: data.name, // email js templaet {{from_name}}
      message: data.message, // email js template message
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        toast.success("Message sent successfully!");
        reset();
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Failed to send message.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="mt-12 bg-gray-100 opacity-90 shadow-md rounded-lg p-2 flex flex-col md:flex-row">
        <div className="md:w-1/2 flex justify-center items-center p-4 order-1 md:order-2 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="animate-spin h-10 w-10 text-[#ff0000]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          <Image
            src="https://i.ibb.co/mN0KhWY/question-mark-5976736-1920.png"
            alt="Contact Illustration"
            width={500}
            height={500}
            className={`w-full h-auto transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
        <div className="md:w-1/2 p-4 order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-6 text-primary-color">Contact us</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                {...register("name", {required: true})}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {required: true})}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Message"
                rows="4"
                {...register("message", {required: true})}
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button
                className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
