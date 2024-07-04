import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #242223;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setLoading(false);
    console.log(e.target.files[0]);
    console.log(file);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(res.data);
      alert('File uploaded successfully');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <UploadWrapper>
      <Title>File Upload</Title>
      <form onSubmit={handleFileUpload}>
        <Input type="file" onChange={handleFileChange} />
        <Button type="submit">Upload</Button>
      </form>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
    </UploadWrapper>
  );
};

export default FileUpload;
