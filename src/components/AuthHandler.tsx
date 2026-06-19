"use client";

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess } from '@/utils/toast';

export const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. Listen for the PASSWORD_RECOVERY event from Supabase globally
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        showSuccess("Password reset token verified. Redirecting to password setup...");
        navigate('/login?recovery=true', { replace: true });
      }
    });

    // 2. Also check URL hash directly as a fallback if they land on the root page
    if (location.hash && (location.hash.includes('type=recovery') || location.hash.includes('access_token='))) {
      navigate('/login' + location.hash, { replace: true });
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  return null;
};

export default AuthHandler;