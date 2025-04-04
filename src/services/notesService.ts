
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  color?: string;
}

// Mock initial notes
const MOCK_NOTES: Note[] = [
  {
    id: '1',
    userId: 'user-1',
    title: 'Welcome to MindfulNotes',
    content: 'This is your first note! Start writing down your thoughts, ideas, and reminders. Click on a note to edit it, or create a new one with the "+" button.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    color: '#9b87f5'
  },
  {
    id: '2',
    userId: 'user-1',
    title: 'Tips for effective note-taking',
    content: '1. Keep notes brief and to the point\n2. Use bullet points for clarity\n3. Review and organize notes regularly\n4. Tag important notes for quick reference',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    color: '#0EA5E9'
  },
  {
    id: '3',
    userId: 'user-1',
    title: 'Meeting with design team',
    content: 'Discuss new UI components\nReview color schemes\nPlan next sprint tasks\nSchedule follow-up for next week',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    color: '#14b8a6'
  }
];

export const useNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all notes for the current user
  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call - would be replaced with real API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo, get notes from localStorage or use mock data
      const storedNotes = localStorage.getItem('notes');
      let userNotes = storedNotes ? JSON.parse(storedNotes) : MOCK_NOTES;
      
      // Filter notes for current user
      if (user) {
        userNotes = userNotes.filter((note: Note) => note.userId === user.id);
      }
      
      setNotes(userNotes);
    } catch (err) {
      console.error('Failed to fetch notes', err);
      setError('Failed to load notes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single note by ID
  const getNote = (id: string) => {
    const allNotes = getAllStoredNotes();
    return allNotes.find(note => note.id === id);
  };

  // Create a new note
  const createNote = async (title: string, content: string, color?: string) => {
    if (!user) return null;
    
    const now = new Date().toISOString();
    const newNote: Note = {
      id: `note-${Date.now()}`,
      userId: user.id,
      title,
      content,
      createdAt: now,
      updatedAt: now,
      color: color || getNoteColor()
    };

    try {
      // Mock API call - would be replaced with real API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allNotes = getAllStoredNotes();
      const updatedNotes = [newNote, ...allNotes];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      
      // Update state with new notes for current user
      setNotes(prevNotes => [newNote, ...prevNotes]);
      return newNote;
    } catch (err) {
      console.error('Failed to create note', err);
      setError('Failed to create note. Please try again.');
      return null;
    }
  };

  // Update an existing note
  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      // Mock API call - would be replaced with real API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allNotes = getAllStoredNotes();
      const noteIndex = allNotes.findIndex(note => note.id === id);
      
      if (noteIndex === -1) {
        throw new Error('Note not found');
      }
      
      const updatedNote = {
        ...allNotes[noteIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      allNotes[noteIndex] = updatedNote;
      localStorage.setItem('notes', JSON.stringify(allNotes));
      
      // Update state with updated notes for current user
      setNotes(prevNotes => 
        prevNotes.map(note => note.id === id ? updatedNote : note)
      );
      
      return updatedNote;
    } catch (err) {
      console.error('Failed to update note', err);
      setError('Failed to update note. Please try again.');
      return null;
    }
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    try {
      // Mock API call - would be replaced with real API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allNotes = getAllStoredNotes();
      const filteredNotes = allNotes.filter(note => note.id !== id);
      
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
      
      // Update state with filtered notes for current user
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      
      return true;
    } catch (err) {
      console.error('Failed to delete note', err);
      setError('Failed to delete note. Please try again.');
      return false;
    }
  };

  // Helper function to get all notes from localStorage
  const getAllStoredNotes = (): Note[] => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : MOCK_NOTES;
  };

  // Helper function to generate random note colors
  const getNoteColor = (): string => {
    const colors = ['#9b87f5', '#0EA5E9', '#14b8a6', '#7E69AB'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Load notes on mount and when user changes
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
