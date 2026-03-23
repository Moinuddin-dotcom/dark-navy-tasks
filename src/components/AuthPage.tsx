import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User } from '@/lib/types';
import { CheckSquare } from 'lucide-react';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const userName = isRegister ? name : email.split('@')[0];
    onLogin({ name: userName || 'User', email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/20">
              <CheckSquare className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              TaskFlow
            </h1>
          </div>
          <p className="text-muted-foreground">
            Organize your work. Ship faster.
          </p>
        </div>

        <Card className="border-border/50 shadow-2xl shadow-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">
              {isRegister ? 'Create an account' : 'Welcome back'}
            </CardTitle>
            <CardDescription>
              {isRegister
                ? 'Enter your details to get started'
                : 'Sign in to your workspace'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <Button type="submit" className="w-full font-semibold">
                {isRegister ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isRegister
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Register"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
