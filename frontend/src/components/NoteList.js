import './NoteList.css';

export default function NoteList({ notes, onEdit, onDelete, onArchive }) {
  
    if (notes.length === 0) {
        return <p>Go and make some notes!</p>;
    }

    return (
        <div className="notes-grid">
            {notes.map(note => (
                <div key={note.id} className="note-card">
                    <div className="note-body">{note.body}</div>

                    <div className="note-actions">
                        <button onClick={() => onEdit(note)} title="Edit">Edit</button>
                        <button onClick={() => onArchive(note.id)}>
                            {note.archived ? "Unarchive" : "Archive"}
                        </button>
                        <button onClick={() => onDelete(note.id)} title="Delete">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}