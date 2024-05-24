"use client";
import type { NextPage } from "next";
import { useState } from "react";
import ResumeDisplay from "../components/ResumeDisplay";
import { ResumeData } from "../types/ResumeData";
import Image from "next/image";

const UploadPage: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJobDescription(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please upload a PDF file.");
      return;
    }

    if (!jobDescription) {
      setErrorMessage("Please provide a job description.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", jobDescription);
    try {
      const response = await fetch("https://api.iwantthisjobsobad.org/resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setResumeData(data);
        setErrorMessage(null);
      } else {
        setErrorMessage(data.message || "Unknown error occurred");
        console.error(data.message);
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
      console.error("Error during file upload:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <h1 className="text-lg font-bold mb-4">
          Upload PDF and Job Description
        </h1>
        <textarea
          rows={5}
          placeholder="Paste the job description here"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleDescriptionChange}
          value={jobDescription}
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className={`px-4 py-2 ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white rounded mb-4`}
          disabled={isLoading}
        >
          Upload File
          {isLoading ? "Uploading..." : "Upload File"}
        </button>
        {resumeData && (
          <>
            <ResumeDisplay resumeData={resumeData} />
          </>
        )}
        {isLoading && (
          <div className="waitingPng max-w-4xl mx-auto bg-white p-8 relative">
            <Image
              src="/waiting.svg"
              alt="Loading..."
              layout="fill"
              className="!relative"
            />
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 border border-red-500 text-red-500 bg-red-100 rounded">
            <p className="mb-2">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
