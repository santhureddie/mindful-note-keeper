
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  color?: string;
}

// Define the shapes of our database rows
interface NoteRow {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  color?: string;
}

export const useNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get all notes for the current user
  const fetchNotes = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // We use any here to bypass TypeScript's type checking for Supabase
      // since the notes table is not in the Supabase TypeScript definition
      const { data, error } = await (supabase as any)
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform the data from database format to our app's format
      const transformedNotes = (data as NoteRow[]).map((note) => ({
        id: note.id,
        userId: note.user_id,
        title: note.title,
        content: note.content,
        createdAt: note.created_at,
        updatedAt: note.updated_at,
        color: note.color
      }));
      
      setNotes(transformedNotes);
    } catch (err: any) {
      console.error('Failed to fetch notes', err);
      setError('Failed to load notes. Please try again.');
      toast({
        title: "Error loading notes",
        description: err.message || "Failed to load notes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single note by ID
  const getNote = async (id: string) => {
    if (!user) return null;
    
    try {
      // We use any here to bypass TypeScript's type checking
      const { data, error } = await (supabase as any)
        .from('notes')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      if (!data) return null;
      
      const note = data as NoteRow;
      
      return {
        id: note.id,
        userId: note.user_id,
        title: note.title,
        content: note.content,
        createdAt: note.created_at,
        updatedAt: note.updated_at,
        color: note.color
      };
    } catch (err) {
      console.error('Failed to fetch note', err);
      return null;
    }
  };

  // Create a new note
  const createNote = async (title: string, content: string, color?: string) => {
    if (!user) return null;
    
    try {
      // Create the note in the database
      const { data, error } = await (supabase as any)
        .from('notes')
        .insert([
          { 
            title, 
            content, 
            user_id: user.id,
            color 
          }
        ])
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      const newNote = data as NoteRow;
      
      const transformedNote: Note = {
        id: newNote.id,
        userId: newNote.user_id,
        title: newNote.title,
        content: newNote.content,
        createdAt: newNote.created_at,
        updatedAt: newNote.updated_at,
        color: newNote.color
      };
      
      setNotes(prevNotes => [transformedNote, ...prevNotes]);
      
      toast({
        title: "Note created",
        description: "Your note was created successfully",
      });
      
      return transformedNote;
    } catch (err: any) {
      console.error('Failed to create note', err);
      toast({
        title: "Failed to create note",
        description: err.message || "Please try again",
        variant: "destructive",
      });
      return null;
    }
  };

  // Update an existing note
  const updateNote = async (id: string, updates: Partial<Note>) => {
    if (!user) return null;
    
    try {
      // Convert to database column names
      const supabaseUpdates: Partial<NoteRow> = {};
      if (updates.title !== undefined) supabaseUpdates.title = updates.title;
      if (updates.content !== undefined) supabaseUpdates.content = updates.content;
      if (updates.color !== undefined) supabaseUpdates.color = updates.color;
      
      // Update the note in the database
      const { data, error } = await (supabase as any)
        .from('notes')
        .update(supabaseUpdates)
        .eq('id', id)
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      const updatedNote = data as NoteRow;
      
      const transformedNote: Note = {
        id: updatedNote.id,
        userId: updatedNote.user_id,
        title: updatedNote.title,
        content: updatedNote.content,
        createdAt: updatedNote.created_at,
        updatedAt: updatedNote.updated_at,
        color: updatedNote.color
      };
      
      // Update local state
      setNotes(prevNotes => 
        prevNotes.map(note => note.id === id ? transformedNote : note)
      );
      
      toast({
        title: "Note updated",
        description: "Your note was updated successfully",
      });
      
      return transformedNote;
    } catch (err: any) {
      console.error('Failed to update note', err);
      toast({
        title: "Failed to update note",
        description: err.message || "Please try again",
        variant: "destructive",
      });
      return null;
    }
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    if (!user) return false;
    
    try {
      // Delete the note from the database
      const { error } = await (supabase as any)
        .from('notes')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      
      toast({
        title: "Note deleted",
        description: "Your note was deleted successfully",
      });
      
      return true;
    } catch (err: any) {
      console.error('Failed to delete note', err);
      toast({
        title: "Failed to delete note",
        description: err.message || "Please try again",
        variant: "destructive",
      });
      return false;
    }
  };

  // Helper function to generate random note colors
  const getNoteColor = (): string => {
    const colors = ['#9b87f5', '#0EA5E9', '#14b8a6', '#7E69AB'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Load notes when user changes
  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes([]);
    }
  }, [user]);

  return {
    notes,
    isLoading,
    error,
    fetchNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
  };
};
