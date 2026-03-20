import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google.');
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
          <h2 className={styles.welcomeText}>Welcome back</h2>
          <p className={styles.welcomeSubtext}>Please enter your details to sign in.</p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input 
              label="Email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={error ? ' ' : undefined}
            />
            
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={error}
            />
            
            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>
            
            <Button type="submit" fluid disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
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
            <span style={{ color: 'var(--on-surface-variant)' }}>Don't have an account? </span>
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
