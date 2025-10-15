import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './../css/Sidebar.css';

// Import icons from Material UI
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuIcon from '@mui/icons-material/Menu'; // added
import logo from './../assets/logo.png'; // NEW: import your logo image (add file at src/assets/logo.png if missing)

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Keep body class in sync so layout can remove the left margin when overlay is open
  useEffect(() => {
    if (open) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    // cleanup on unmount
    return () => document.body.classList.remove('sidebar-open');
  }, [open]);

  // Helper to navigate and auto-close on mobile
  const handleNavigate = (path) => {
    navigate(path);
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setOpen(false);
    }
  };

  return (
    <nav className={`sidebar-nav ${open ? 'open' : 'collapsed'}`}>
      {/* Brand Logo Section */}
      <div className="navbar-brand">
        {/* Hamburger toggle visible on mobile */}
        <button
          className="sidebar-toggle"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>

        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Hiru Capital Logo" className="sidebar-logo-img" />
          <span className="navbar-logo-text">Hiru Capital Investment</span>
        </Link>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-item" onClick={() => handleNavigate('/Home')}>
          <HomeIcon className="sidebar-icon" />
          <span>Home</span>
        </li>
        <li className="sidebar-item" onClick={() => handleNavigate('/AddLoan')}>
          <MonetizationOnIcon className="sidebar-icon" />
          <span>Loan</span>
        </li>
        <li className="sidebar-item" onClick={() => handleNavigate('/ViewAllLoans')}>
          <CollectionsBookmarkIcon className="sidebar-icon" />
          <span>My Collection</span>
        </li>
        <li className="sidebar-item" onClick={() => handleNavigate('/AddPayment')}>
          <PaymentIcon className="sidebar-icon" />
          <span>Payment</span>
        </li>
        <li className="sidebar-item" onClick={() => handleNavigate('/AddCustomers')}>
          <PersonAddIcon className="sidebar-icon" />
          <span>Add Customers</span>
        </li>
        <li className="sidebar-item" onClick={() => handleNavigate('/ViewAllPayments')}>
          <ReceiptLongIcon className="sidebar-icon" />
          <span>View All Payments</span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
