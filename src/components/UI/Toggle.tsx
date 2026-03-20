import React from 'react';
import clsx from 'clsx';
import styles from './Toggle.module.css';

export interface ToggleProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ options, value, onChange, className }) => {
  return (
    <div className={clsx(styles.toggleGroup, className)}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            className={clsx(styles.toggleButton, { [styles.active]: isActive })}
            onClick={() => !isActive && onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default Toggle;
