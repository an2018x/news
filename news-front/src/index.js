import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/register'
import Login from './pages/login'
import Article from './pages/article'
import Editormd from './pages/editor'
import Admin from './pages/admin'
import Updator from './pages/updator'


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/edit" element={<Editormd />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/updator/:id" element={<Updator />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
