import React, { useState } from 'react';
import axios from 'axios';
import { FaFile, FaImage, FaVideo, FaFilePdf, FaFileWord } from 'react-icons/fa';

const FileUploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    e.preventDefault();
    const newSelectedFiles = Array.from(e.target.files);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newSelectedFiles]);
    e.target.value = null;
  };

  const getFileIcon = (file) => {
    if (file.type && file.type.startsWith('image/')) {
      return <FaImage />;
    } else if (file.type && file.type.startsWith('video/')) {
      return <FaVideo />;
    } else if (file.type === 'application/pdf') {
      return <FaFilePdf />;
    } else if (file.type === 'application/msword') {
      return <FaFileWord />;
    } else {
      return <FaFile />;
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('files', file);
    }

    try {
      const response = await axios.post('YOUR_UPLOAD_API_ENDPOINT', formData);
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleConsoleLog = () => {
    console.log('Files to be sent:', selectedFiles);
    alert('Check the console for the list of files'); // добавим всплывающее окно для информирования
  };
  

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {selectedFiles.length > 0 && (
        <div>
          <h2>Selected Files:</h2>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                {getFileIcon(file)} {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleConsoleLog}>Console Log Selected Files</button>

      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            {getFileIcon(file)} {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadForm;

