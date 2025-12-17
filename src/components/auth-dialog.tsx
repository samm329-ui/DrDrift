
'use client';

import { useState } from 'react';
import { useAuthDialog } from '@/hooks/use-auth-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
        <div className="form">
            <DialogHeader>
              <DialogTitle className="form-title">{isSigningIn ? 'Sign In' : 'Create Account'}</DialogTitle>
              <DialogDescription className="sr-only">
                {isSigningIn ? 'Sign into your account.' : 'Create a new account.'}
              </DialogDescription>
            </DialogHeader>

          <form onSubmit={handleEmailAuth}>
            <div className="flex-column">
                <label>Email </label>
            </div>
            <div className="inputForm">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <input
                    type="email"
                    className="input"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="flex-column">
                <label>Password </label>
            </div>
            <div className="inputForm">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <input
                    type="password"
                    className="input"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}

            <div className="flex-row">
              <div>
                {/* Future "Remember me" checkbox can go here */}
              </div>
               {isSigningIn && <span className="span">Forgot password?</span>}
            </div>

            <button type="submit" className="button-submit">
              {isSigningIn ? 'Sign In' : 'Create Account'}
            </button>
          </form>
           <p className="p">
            {isSigningIn ? "Don't have an account?" : 'Already have an account?'}
            <span className="span" onClick={handleSwitchMode}>
                 {isSigningIn ? 'Sign up' : 'Sign in'}
            </span>
          </p>
          <button className="btn" onClick={handleGoogleSignIn}>
            <GoogleIcon />
            {isSigningIn ? 'Sign in with Google' : 'Sign up with Google'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
