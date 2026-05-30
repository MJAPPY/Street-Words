"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';
import { Sparkles } from 'lucide-react';

const Login = () => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/feed');
    }
  }, [session, navigate]);

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
              Welcome to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">Street Sanctuary</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Join custom disciples to post verses, meditate on life, and walk on the pavement of hope.
            </p>
          </div>

          <div className="auth-container bg-white/40 dark:bg-zinc-950/20 p-6 rounded-[2rem] border border-primary/5">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;