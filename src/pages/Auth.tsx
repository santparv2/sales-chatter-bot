import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Session } from "@supabase/supabase-js";
import { Loader2, Mail, Lock, User2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect to dashboard if user is logged in
        if (session?.user) {
          navigate('/');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Redirect if already logged in
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Get the current origin, fallback to production URL if needed
      const baseUrl = window.location.origin.includes('localhost') 
        ? 'https://id-preview--c1189895-ab18-4d93-a401-69073176128a.lovable.app'
        : window.location.origin;
      const redirectUrl = `${baseUrl}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName
          }
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          setError("This email is already registered. Please try logging in instead.");
        } else if (error.message.includes("Email address") && error.message.includes("invalid")) {
          setError("Please enter a valid email address. Make sure it follows the format: user@domain.com");
        } else if (error.message.includes("rate limit")) {
          setError("Too many requests. Please wait a moment before trying again.");
        } else {
          setError(error.message);
        }
        } else {
          setError("");
          setSuccess("Check your email for the confirmation link!");
          toast({
            title: "Account created successfully!",
            description: "Please check your email to confirm your account.",
            duration: 5000,
          });
        }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please check your credentials and try again.");
        } else if (error.message.includes("Email not confirmed")) {
          setError("Please confirm your email address before signing in.");
        } else {
          setError(error.message);
        }
      } else {
        setSuccess("Welcome back! Redirecting to dashboard...");
        toast({
          title: "Signed in successfully!",
          description: "Welcome back to your CRM dashboard.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Signin error:", error);
      setError("An unexpected error occurred during signin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)] flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-[var(--shadow-elevated)] animate-scale-in backdrop-blur-sm bg-card/95 border-border/50">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mb-2 animate-pulse-glow">
            <User2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            CRM Access
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your leads and customers
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="signin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="signin" className="transition-all duration-200">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="transition-all duration-200">Sign Up</TabsTrigger>
            </TabsList>
            
            {error && (
              <Alert className="border-destructive/50 bg-destructive/5 animate-slide-up">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-success/50 bg-success/5 animate-slide-up">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success font-medium">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <TabsContent value="signin" className="space-y-4 animate-fade-in">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email (e.g., user@gmail.com)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="pl-10 transition-all duration-200 focus:shadow-[var(--shadow-glow)] focus:border-primary"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 transition-all duration-200 focus:shadow-[var(--shadow-glow)] focus:border-primary"
                      disabled={loading}
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-button)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 animate-fade-in">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">Display Name</Label>
                  <div className="relative">
                    <User2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                      className="pl-10 transition-all duration-200 focus:shadow-[var(--shadow-glow)] focus:border-primary"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email (e.g., user@gmail.com)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="pl-10 transition-all duration-200 focus:shadow-[var(--shadow-glow)] focus:border-primary"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password (min. 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 transition-all duration-200 focus:shadow-[var(--shadow-glow)] focus:border-primary"
                      disabled={loading}
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-button)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              disabled={loading}
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;