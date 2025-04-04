
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Note } from "@/services/notesService";
import { Loader2, Save, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NoteEditorProps {
  note: Note | null;
  onSave: (title: string, content: string, color?: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading?: boolean;
}

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  color: z.string().optional(),
});

type NoteFormValues = z.infer<typeof noteSchema>;

const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  onSave,
  onDelete,
  isLoading = false,
}) => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(note?.color);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
      color: note?.color,
    },
  });

  // Update form when note changes
  useEffect(() => {
    if (note) {
      form.reset({
        title: note.title,
        content: note.content,
        color: note.color,
      });
      setSelectedColor(note.color);
    } else {
      form.reset({
        title: "",
        content: "",
        color: undefined,
      });
      setSelectedColor(undefined);
    }
  }, [note, form]);

  const onSubmit = async (data: NoteFormValues) => {
    setIsSaving(true);
    try {
      await onSave(data.title, data.content, selectedColor);
      toast({
        title: note ? "Note updated" : "Note created",
        description: "Your note has been saved successfully.",
      });
    } catch (error) {
      console.error("Failed to save note:", error);
      toast({
        title: "Error saving note",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete();
      setDeleteDialogOpen(false);
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast({
        title: "Error deleting note",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const noteColors = [
    { value: '#9b87f5', label: 'Purple' },
    { value: '#0EA5E9', label: 'Blue' },
    { value: '#14b8a6', label: 'Teal' },
    { value: '#7E69AB', label: 'Violet' },
  ];

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full flex flex-col">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Note title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Color:</span>
            <div className="flex gap-2">
              {noteColors.map((color) => (
                <div
                  key={color.value}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedColor === color.value ? 'border-gray-800' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color.value)}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your note here..." 
                    className="min-h-[300px] flex-1 resize-none" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-2 mt-auto">
            {onDelete && (
              <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" type="button" className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      note from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button
              type="submit"
              className="ml-auto bg-note-purple hover:bg-note-violet"
              disabled={isSaving || isLoading}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Note
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NoteEditor;
