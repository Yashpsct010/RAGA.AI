import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2, Settings, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/patients', label: 'Patients', icon: Users },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <ShieldAlert className={styles.logoIcon} size={28} />
        <span className={styles.logoText}>Clinical Architect</span>
      </div>
      
      <nav className={styles.navConfig}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(styles.navItem, { [styles.active]: isActive })}
          >
            <item.icon size={20} className={styles.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className={styles.footer}>
        <p className={styles.version}>v1.0.0-beta</p>
      </div>
    </aside>
  );
};

export default Sidebar;
