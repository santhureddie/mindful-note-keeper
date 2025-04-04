
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Note } from "@/services/notesService";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
  className?: string;
}

const NoteCard = ({ note, onClick, className }: NoteCardProps) => {
  // Format the date for display
  const formattedDate = formatDistanceToNow(new Date(note.updatedAt), { 
    addSuffix: true 
  });

  // Truncate content if it's too long
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  // Create gradient based on note color
  const getCardStyle = () => {
    if (!note.color) return {};
    
    return {
      borderTopWidth: '4px',
      borderTopColor: note.color,
      boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 2px ${note.color}10`
    };
  };

  return (
    <Card 
      className={cn(
        "h-full cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg note-card", 
        className
      )}
      style={getCardStyle()}
      onClick={() => onClick(note)}
    >
      <CardHeader className="pb-2">
        <h3 className="font-medium text-lg">{note.title || "Untitled Note"}</h3>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {truncateContent(note.content)}
        </p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
