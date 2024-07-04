import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ListWrapper = styled.div`
  padding: 20px;
  background-color: #242223;
  border-radius: 4px;
  margin: 20px;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  & + & {
    margin-left: 10px;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;
const FileList = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/files', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFiles(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiles();
  }, []);

  const handleFileDownload = async (fileName) => {
    try {
      const response = await axios.get(`/files/download/${fileName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileDelete = async (fileName) => {
    try {
      const response = await axios.delete(`/files/delete/${fileName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFiles(files.filter((file) => file.fileName !== fileName));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ListWrapper>
      <Title>Files</Title>
      <ul>
        {files.map((file) => (
          <FileItem key={file.fileName}>
            <p>{file.fileName}</p>
            <Button onClick={() => handleFileDownload(file.fileName)}>
              Download
            </Button>
            <button onClick={() => handleFileDelete(file.fileName)}>
              Delete
            </button>
          </FileItem>
        ))}
      </ul>
    </ListWrapper>
  );
};

export default FileList;
