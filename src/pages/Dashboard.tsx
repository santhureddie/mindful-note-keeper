
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotes, Note } from "@/services/notesService";
import { Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import NoteCard from "@/components/notes/NoteCard";
import NoteEditor from "@/components/notes/NoteEditor";
import EmptyNotes from "@/components/notes/EmptyNotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Search, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const { notes, isLoading, createNote, updateNote, deleteNote } = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsNoteDialogOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsNoteDialogOpen(true);
  };

  const handleSaveNote = async (title: string, content: string, color?: string) => {
    try {
      if (selectedNote) {
        await updateNote(selectedNote.id, { title, content, color });
      } else {
        await createNote(title, content, color);
      }
      setIsNoteDialogOpen(false);
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;
    
    try {
      await deleteNote(selectedNote.id);
      setIsNoteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Your Notes</h1>
          
          <div className="flex w-full md:w-auto gap-2 flex-1 md:flex-initial">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-2.5 top-2.5"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            
            <Button 
              onClick={handleCreateNote}
              className="whitespace-nowrap bg-note-purple hover:bg-note-violet"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="lds-ring text-note-purple">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : notes.length === 0 ? (
          <EmptyNotes onCreateNote={handleCreateNote} />
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notes match your search.</p>
            <Button 
              variant="link" 
              onClick={() => setSearchQuery("")}
              className="mt-2"
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={handleEditNote}
              />
            ))}
          </div>
        )}
      </div>
      
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {selectedNote ? "Edit Note" : "Create New Note"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <NoteEditor
              note={selectedNote}
              onSave={handleSaveNote}
              onDelete={selectedNote ? handleDeleteNote : undefined}
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <Button 
              variant="outline" 
              onClick={() => setIsNoteDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
