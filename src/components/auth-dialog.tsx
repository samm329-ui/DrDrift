
'use client';

import { useState } from 'react';
import { useAuthDialog } from '@/hooks/use-auth-dialog';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import GoogleIcon from './icons/google-icon';
import { Mail, Lock } from 'lucide-react';

export function AuthDialog() {
  const { isAuthDialogOpen, closeAuthDialog } = useAuthDialog();
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      closeAuthDialog();
      toast({ title: 'Signed in successfully!' });
    } catch (e) {
      const error = e as AuthError;
      setError(error.message);
      toast({ variant: 'destructive', title: 'Sign-in failed', description: error.message });
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSigningIn) {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Signed in successfully!' });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Account created successfully!' });
      }
      closeAuthDialog();
    } catch (e) {
        const error = e as AuthError;
        setError(error.message);
        toast({ variant: 'destructive', title: 'Authentication failed', description: error.message });
    }
  };

  const handleSwitchMode = () => {
    setIsSigningIn(!isSigningIn);
    setError(null);
    setEmail('');
    setPassword('');
  }

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={closeAuthDialog}>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
        <div className="auth-form bg-background p-8 rounded-2xl">
          <p className="auth-form-title">{isSigningIn ? 'Sign In' : 'Create Account'}</p>
          <form onSubmit={handleEmailAuth}>
            <div className="auth-flex-column">
                <label>Email </label>
            </div>
            <div className="auth-input-form">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <input
                    type="email"
                    className="auth-input"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="auth-flex-column">
                <label>Password </label>
            </div>
            <div className="auth-input-form">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <input
                    type="password"
                    className="auth-input"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            <button type="submit" className="auth-button-submit">
              {isSigningIn ? 'Sign In' : 'Create Account'}
            </button>
          </form>
           <p className="auth-p">
            {isSigningIn ? "Don't have an account?" : 'Already have an account?'}
            <span className="auth-span" onClick={handleSwitchMode}>
                 {isSigningIn ? 'Sign up' : 'Sign in'}
            </span>
          </p>
          <button className="auth-btn" onClick={handleGoogleSignIn}>
            <GoogleIcon />
            {isSigningIn ? 'Sign in with Google' : 'Sign up with Google'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

    