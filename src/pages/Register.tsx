import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import styles from './Login.module.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create an account. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Google.';
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.branding}>
          <ShieldAlert size={40} className={styles.logoIcon} />
          <h1 className={styles.logoText}>Clinical Architect</h1>
        </div>
        <p className={styles.subtitle}>Precision medical data management for modern healthcare institutions.</p>
      </div>
      
      <div className={styles.rightPanel}>
        <div className={styles.loginFormContainer}>
          <h2 className={styles.welcomeText}>Create an account</h2>
          <p className={styles.welcomeSubtext}>Sign up to access your clinical workspace.</p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input 
              label="Email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={error.includes('email') ? error : undefined}
            />
            
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input 
              label="Confirm Password" 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={error.includes('Password') ? error : undefined}
            />
            
            <Button type="submit" fluid disabled={isLoading} style={{ marginTop: '0.5rem' }}>
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>
          
          <div className={styles.divider}>
            <span>or continue with</span>
          </div>
          
          <div className={styles.socialLogins}>
            <Button variant="social" fluid type="button" onClick={handleGoogleLogin}>
              Google
            </Button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--on-surface-variant)' }}>Already have an account? </span>
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
