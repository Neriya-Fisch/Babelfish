import React,{useState,useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

const Logout = () => {
    const navigate = useNavigate();

    if(localStorage.getItem("user"))
      localStorage.removeItem("user");

    useEffect(() => {
      navigate("/login");
    }, []);

    return null;
	};

export default Logout;