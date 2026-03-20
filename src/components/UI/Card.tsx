import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 'lowest' | 'low' | 'high' | 'highest';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation = 'lowest', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={clsx(styles.card, styles[elevation], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
