import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProvider } from "@/components/SessionProvider";
import AuthHandler from "@/components/AuthHandler";
import Index from "./pages/Index";
import Feed from "./pages/Feed";
import Categories from "./pages/Categories";
import Store from "./pages/Store";
import Admin from "./pages/Admin";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Mission from "./pages/Mission";
import { supabaseService } from "@/utils/supabaseService";

const queryClient = new QueryClient();

const App = () => {
  // Trigger non-blocking database Keep-Alive heartbeat on startup
  useEffect(() => {
    supabaseService.pingKeepAlive();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <SessionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {/* Catch password recovery tokens globally and redirect the user */}
              <AuthHandler />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/store" element={<Store />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/profile/:username?" element={<Profile />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;