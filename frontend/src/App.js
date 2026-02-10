import { useEffect, useState } from 'react';
import { getActiveNotes, getArchivedNotes, createNote, editNote, deleteNote, toggleArchive } from './api/NotesApi';
import NoteList from './components/NoteList';
import NoteModal from './components/NoteModal';
import './App.css';

function App() {

  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getActiveNotes()
      .then(data => setNotes(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  function showActiveNotes() {
    setShowArchived(false);
    getActiveNotes().then(setNotes);
  }

  function showArchivedNotes() {
    setShowArchived(true);
    getArchivedNotes().then(setNotes);
  }

  function handleCreateNote(text) {
    createNote(text).then(() => {
      if (showArchived) {
        getArchivedNotes().then(setNotes);
      } else {
        getActiveNotes().then(setNotes);
      }
    });
  }

  function handleEditNote(text) {
    editNote(text, editingNote.id).then(editedNote => {
      setNotes(prev =>
        prev.map(note => (note.id === editedNote.id ? editedNote : note))
      );
    });
  }

  function handleDeleteNote(id) {
    deleteNote(id).then(() => {
      setNotes(prev => prev.filter(note => (note.id !== id)));
    });
  }

  function handleToggleArchive(id) {
    toggleArchive(id).then(() => {
      if (showArchived) {
        getArchivedNotes().then(setNotes);
      } else {
        getActiveNotes().then(setNotes);
      }
    });
  }

  function openCreateModal() {
    setEditingNote(null);
    setShowModal(true);
  }

  function openEditModal(note) {
    setEditingNote(note);
    setShowModal(true);
  }

  return (
    <div className="app-container">
      <header className="page-header">
        <h1>Notes</h1>
        <button className="add-note-button" onClick={openCreateModal}>
          + New note
        </button>
      </header>

      <div className="view-toggle">
        <button
          onClick={showActiveNotes}
          className={!showArchived ? "active" : ""}
        >
          Active
        </button>

        <button
          onClick={showArchivedNotes}
          className={showArchived ? "active" : ""}
        >
          Archived
        </button>
      </div>

      <NoteList 
        notes={notes} 
        onEdit={openEditModal} 
        onDelete={handleDeleteNote} 
        onArchive={handleToggleArchive}
      />

      <NoteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={editingNote ? handleEditNote : handleCreateNote}
        initialValue={editingNote?.body || ""}
        title={editingNote ? "Edit this note" : "New note"}
      />
    </div>
  );
}

export default App;
