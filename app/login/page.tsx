"use client";

import React from "react";
import axios from "axios";
import LoginForm from "../../components/LoginForm";

axios.defaults.baseURL = "http://localhost:3000/";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
