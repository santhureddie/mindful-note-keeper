
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { useAuth } from "@/context/AuthContext";
import { FileText, Lock, Smile, PenSquare } from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-note-violet to-note-blue bg-clip-text text-transparent">
              The Mindful Way to Keep Notes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A simple, beautiful notes app that helps you organize your thoughts, ideas, and reminders.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="text-lg py-6 px-8 bg-note-purple hover:bg-note-violet">
                    <PenSquare className="mr-2 h-5 w-5" />
                    Go to My Notes
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button className="text-lg py-6 px-8 bg-note-purple hover:bg-note-violet">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="text-lg py-6 px-8">
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-note-lightPurple flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-note-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simple Organization</h3>
                <p className="text-muted-foreground">
                  Keep all your notes in one place, easily searchable and always accessible.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-note-lightBlue flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-note-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
                <p className="text-muted-foreground">
                  Your notes are private to your account and securely stored.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-note-lightPurple flex items-center justify-center mb-4">
                  <Smile className="h-6 w-6 text-note-violet" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Intuitive Design</h3>
                <p className="text-muted-foreground">
                  Clean, minimal interface that lets you focus on what matters - your notes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join today and start organizing your thoughts with MindfulNotes.
            </p>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-note-purple hover:bg-note-violet">
                  <PenSquare className="mr-2 h-5 w-5" />
                  Go to My Notes
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button className="bg-note-purple hover:bg-note-violet">
                  Create Your Free Account
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 MindfulNotes. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
