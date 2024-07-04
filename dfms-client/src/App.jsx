import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import './App.css';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #007bff;
  padding: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  return (
    <>
      <Router>
        <Container>
          <Nav>
            <NavLink to="/">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/upload">Upload</NavLink>
            <NavLink to="/files">Files</NavLink>
          </Nav>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/files" element={<FileList />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
