import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeSwitch.css';

export function ThemeSwitch() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-switch-wrapper">
      <span className="theme-switch-label">
        {isDarkMode ? '🌙' : '☀️'}
      </span>
      <label className="theme-switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
} 