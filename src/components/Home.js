// src/components/Home.js

import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="App">
      <header className="navbar">
        <div className="logo">
          <span className="white">Online</span>
          <span className="green">Vote</span>
        </div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#instructions">Instructions</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="hero-section">
        <h1>Secure Online Voting System</h1>
        <p>
          Cast your vote anytime, anywhere with our secure and transparent online voting
          platform. Your voice matters!
        </p>
        <div className="buttons">
          <button className="signup-btn">Sign Up</button>
          <button className="login-btn">Login</button>
        </div>
      </main>

      <footer className="footer">
        © 2023 Online Voting System. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
