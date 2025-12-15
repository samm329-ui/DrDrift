
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import GoogleIcon from './icons/google-icon';

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

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={closeAuthDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSigningIn ? 'Sign In' : 'Create Account'}</DialogTitle>
          <DialogDescription>
            {isSigningIn ? 'Sign in to access your account.' : 'Create an account to get started.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Button variant="outline" onClick={handleGoogleSignIn}>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign in with Google
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              {isSigningIn ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          <Separator />
           <div className="text-center">
             <Button variant="link" onClick={() => setIsSigningIn(!isSigningIn)}>
                {isSigningIn
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
            </Button>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
