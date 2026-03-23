"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';

export default function PasswordField({ placeholder, id, name }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.passwordContainer}>
      <input 
        type={showPassword ? "text" : "password"} 
        placeholder={placeholder} 
        id={id} 
        name={name} 
        required 
      />
      <i 
        className={[styles.eyeIcon, showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"].join(' ')}
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: 'pointer' }}
      ></i>
    </div>
  );
}