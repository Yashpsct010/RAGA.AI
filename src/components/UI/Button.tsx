import React, { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'social';
  fluid?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fluid = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(clsx(styles.btn, styles[variant], { [styles.fluid]: fluid }, className))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
