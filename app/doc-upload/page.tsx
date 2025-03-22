"use client";
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz4qd1hpIZMZ1TWUb8PaDVlMpneKoGzhU",
  authDomain: "hackoverflow-44154.firebaseapp.com",
  projectId: "hackoverflow-44154",
  storageBucket: "hackoverflow-44154.firebasestorage.app",
  messagingSenderId: "613795222571",
  appId: "1:613795222571:web:9be15a5888e9aabdbec66e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function PdfUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        if (file.size <= 5 * 1024 * 1024) { // 5MB limit
          setSelectedFile(file);
        } else {
          alert('File size exceeds 5MB');
          e.target.value = '';
        }
      } else {
        alert('Please select a PDF file');
        e.target.value = '';
      }
    }
  };

  useEffect(() => {
    const uploadFile = async () => {
      if (selectedFile) {
        try {
          setUploadStatus('uploading');
          const storageRef = ref(storage, `pdfs/${selectedFile.name}`);
          await uploadBytes(storageRef, selectedFile);
          const url = await getDownloadURL(storageRef);
          console.log('File uploaded successfully. Download URL:', url);
          setUploadStatus('success');
        } catch (error) {
          console.error('Error uploading file:', error);
          setUploadStatus('error');
        }
      }
    };

    uploadFile();
  }, [selectedFile]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white-800 mb-4">Upload PDF</h1>

        <label className="flex flex-col items-center px-4 py-6 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-100 transition-colors duration-200">
          <svg 
            className="w-12 h-12 text-blue-500 mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          
          <span className="text-blue-600 font-medium">
            {selectedFile ? selectedFile.name : 'Select PDF file'}
          </span>
          
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <p className="text-gray-500 text-sm mt-3 text-center">
          Supported format: PDF (max 5MB)
        </p>

        {selectedFile && (
          <div className="mt-4 p-3 rounded-md">
            <p className="text-green-600 text-center">
              {selectedFile.name} selected ({Math.round(selectedFile.size / 1024)} KB)
            </p>
            {uploadStatus === 'uploading' && (
              <p className="text-blue-600 text-center mt-2">Uploading...</p>
            )}
            {uploadStatus === 'success' && (
              <p className="text-green-600 text-center mt-2">Upload successful!</p>
            )}
            {uploadStatus === 'error' && (
              <p className="text-red-600 text-center mt-2">Upload failed. Please try again.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}