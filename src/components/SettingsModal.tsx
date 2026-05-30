"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings, Moon, Sun, Bell, LogOut, Globe, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState(true);
  const [isPublic, setIsPublic] = useState(true);

  const handleLogout = () => {
    showSuccess("Logging out of the street...");
    setIsOpen(false);
  };

  const handleDeleteAccount = () => {
    showSuccess("Your account and shared word associations have been deleted.");
    setIsOpen(false);
    navigate('/');
  };

  const handleSave = () => {
    showSuccess("Preferences updated!");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-primary/5 h-12 w-12 border border-primary/5">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl p-8">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Settings className="h-5 w-5" />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight">App Settings</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Appearance Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Appearance</h4>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-amber-500" />}
                <span className="text-sm font-bold">Dark Mode</span>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
              />
            </div>
          </div>

          {/* Notifications Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold">Push Notifications</span>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold">Public Profile</span>
                </div>
                <Switch 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-destructive">Danger Zone</h4>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="w-full justify-start gap-3 rounded-2xl h-12 border-destructive/20 text-destructive hover:bg-destructive/5 font-bold"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive"
                    className="w-full justify-start gap-3 rounded-2xl h-12 bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive hover:text-white font-bold"
                  >
                    <Trash2 className="h-4 w-4" /> Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[2rem] border-none p-8">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-black text-foreground">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground font-medium text-sm leading-relaxed">
                      This action cannot be undone. This will permanently delete your account, remove your custom verse posts, and delete your reflections from our database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="gap-3 mt-6">
                    <AlertDialogCancel className="rounded-full font-black uppercase tracking-widest text-[10px] h-12 px-6 border-transparent bg-muted/40 hover:bg-muted/60">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="rounded-full font-black uppercase tracking-widest text-[10px] h-12 px-6 bg-destructive hover:bg-destructive/90 text-white shadow-lg shadow-destructive/20"
                    >
                      Delete Forever
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-primary/5">
          <Button 
            variant="ghost" 
            onClick={() => setIsOpen(false)}
            className="flex-1 rounded-full font-black uppercase tracking-widest text-xs h-12"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs h-12 shadow-lg shadow-primary/20"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;