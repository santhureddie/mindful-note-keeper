
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyNotesProps {
  onCreateNote: () => void;
}

const EmptyNotes = ({ onCreateNote }: EmptyNotesProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
      <div className="bg-note-lightPurple w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <PlusCircle className="h-8 w-8 text-note-purple" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">No notes yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        You haven't created any notes yet. Start capturing your ideas, tasks, or whatever's on your mind.
      </p>
      <Button 
        onClick={onCreateNote}
        className="bg-note-purple hover:bg-note-violet"
      >
        <PlusCircle className="mr-2 h-5 w-5" /> Create your first note
      </Button>
    </div>
  );
};

export default EmptyNotes;
