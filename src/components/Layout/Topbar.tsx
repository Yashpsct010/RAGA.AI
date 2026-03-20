import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import Input from '../UI/Input';
import styles from './Topbar.module.css';

const Topbar: React.FC = () => {
  const handleLogout = () => {
    signOut(auth);
  };

  const handleNotificationClick = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Healthcare SaaS', {
          body: 'You have a new clinical alert.',
        });
      }
    }
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.searchContainer}>
        <div className={styles.searchIconWrapper}>
          <Search size={18} className={styles.searchIcon} />
        </div>
        <input 
          type="text" 
          placeholder="Search patients, doctors, or reports..." 
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.actions}>
        <button className={styles.iconButton} onClick={handleNotificationClick} title="Test Notification">
          <Bell size={20} />
          <span className={styles.badge}>3</span>
        </button>
        
        <div className={styles.profileBox}>
          <div className={styles.avatar}>
            <User size={18} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Dr. Sarah Jenkins</span>
            <span className={styles.userRole}>Chief Cardiologist</span>
          </div>
        </div>
        
        <button className={styles.logoutButton} onClick={handleLogout} title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
