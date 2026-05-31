"use client";

import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';
import { Sparkles, Key, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess, showError } from '@/utils/toast';

const Login = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [authView, setAuthView] = useState<"standard" | "update_password">("standard");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Listen specifically for Supabase password recovery session events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthView("update_password");
        showSuccess("Password recovery token verified. Please enter your new password.");
      } else if (event === 'SIGNED_IN' && authView !== 'update_password') {
        navigate('/feed');
      } else if (event === 'USER_UPDATED') {
        showSuccess("Your password has been successfully updated!");
        setAuthView("standard");
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, authView]);

  useEffect(() => {
    // If already logged in and not in a recovery state, send to feed
    if (session && authView !== "update_password") {
      navigate('/feed');
    }
  }, [session, navigate, authView]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showError("Password must be at least 6 characters long.");
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      showSuccess("Password updated! Sign in with your new password.");
      setAuthView("standard");
      navigate('/login');
    } catch (err: any) {
      showError(err.message || "Failed to update password.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen urban-pattern bg-background/50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 my-10">
        <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/80 backdrop-blur-md rounded-[3rem] p-10 border border-white/60 dark:border-zinc-800/60 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              <Sparkles className="h-3 w-3" />
              Walk in His Light
            </div>
            
            <h1 className="text-4xl font-black tracking-tighter text-foreground">
              {authView === "update_password" ? (
                <span>Set New Password</span>
              ) : (
                <span>Welcome to the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">Street Sanctuary</span></span>
              )}
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              {authView === "update_password" ? (
                "Please choose a secure new password for your account."
              ) : (
                "Join disciples to post verses, discern on life, and walk with faith on the pavement of hope."
              )}
            </p>
          </div>

          <div className="auth-container bg-white/40 dark:bg-zinc-950/20 p-6 rounded-[2rem] border border-primary/5">
            {authView === "update_password" ? (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="new-password" className="text-xs font-black uppercase tracking-widest px-1">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    required
                    placeholder="Min 6 characters..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isUpdating}
                  className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                >
                  {isUpdating ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Save New Password"}
                </Button>
              </form>
            ) : (
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: 'hsl(var(--primary))',
                        brandAccent: 'hsl(var(--primary))',
                        inputBackground: 'transparent',
                      },
                      radii: {
                        buttonBorderRadius: '9999px',
                        inputBorderRadius: '16px',
                      }
                    }
                  }
                }}
                providers={[]}
                theme="dark"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;