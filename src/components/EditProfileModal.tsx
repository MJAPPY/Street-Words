"use client";

import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile } from '@/types';
import { showError, showSuccess } from '@/utils/toast';
import { Camera, Edit3, Loader2, Globe, Video, Link2, MapPin } from 'lucide-react';

interface EditProfileModalProps {
  user: UserProfile;
  onUpdate: (updatedUser: Partial<UserProfile>) => void;
}

const EditProfileModal = ({ user, onUpdate }: EditProfileModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
    avatar: user.avatar,
    location: user.location || "",
    favoriteVerse: user.favoriteVerse || "",
    favoriteReference: user.favoriteReference || "",
    socialLink: user.socialLink || "",
    videoLink: user.videoLink || "",
    websiteLink: user.websiteLink || ""
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 512 * 1024; // 512KB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showError("File is too large. Limit is 512KB.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      showSuccess("Photo uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpdate(formData);
      setIsLoading(false);
      setIsOpen(false);
      showSuccess("Profile updated successfully!");
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 gap-2 font-black text-xs uppercase tracking-widest">
          <Edit3 className="h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none shadow-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight">Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-primary to-[#ec4899] p-1 shadow-xl overflow-hidden">
                {formData.avatar.length > 2 ? (
                  <img src={formData.avatar} alt="Preview" className="h-full w-full object-cover rounded-[1.4rem]" />
                ) : (
                  <div className="h-full w-full rounded-[1.4rem] bg-white flex items-center justify-center text-3xl font-black text-primary">
                    {formData.avatar}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-[1.4rem] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-6 w-6" />
              </button>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Max 512KB</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest px-1">Display Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                placeholder="e.g. Urban Sanctuary, New York"
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest px-1">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="rounded-2xl bg-muted/30 border-transparent focus:bg-white transition-all font-medium min-h-[100px]"
                placeholder="Tell the street your story..."
              />
            </div>

            {/* Social & Media Links Section */}
            <div className="pt-4 border-t border-primary/5 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Links & Networks</h4>
              
              <div className="space-y-2">
                <Label htmlFor="websiteLink" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                  <Globe className="h-3 w-3 text-primary" /> Personal Website
                </Label>
                <Input
                  id="websiteLink"
                  placeholder="https://example.com"
                  value={formData.websiteLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, websiteLink: e.target.value }))}
                  className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoLink" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                  <Video className="h-3 w-3 text-red-500" /> Video Channel
                </Label>
                <Input
                  id="videoLink"
                  placeholder="https://youtube.com/channel/..."
                  value={formData.videoLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoLink: e.target.value }))}
                  className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialLink" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                  <Link2 className="h-3 w-3 text-purple-500" /> Social Profile
                </Label>
                <Input
                  id="socialLink"
                  placeholder="https://instagram.com/yourhandle"
                  value={formData.socialLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, socialLink: e.target.value }))}
                  className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-primary/5 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Life Verse</h4>
              <div className="space-y-2">
                <Label htmlFor="favVerse" className="text-xs font-black uppercase tracking-widest px-1">Verse Text</Label>
                <Textarea
                  id="favVerse"
                  value={formData.favoriteVerse}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteVerse: e.target.value }))}
                  className="rounded-2xl bg-muted/30 border-transparent focus:bg-white transition-all font-medium min-h-[80px]"
                  placeholder="Your anchor verse..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favRef" className="text-xs font-black uppercase tracking-widest px-1">Reference</Label>
                <Input
                  id="favRef"
                  value={formData.favoriteReference}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteReference: e.target.value }))}
                  className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold"
                  placeholder="e.g. John 3:16"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;