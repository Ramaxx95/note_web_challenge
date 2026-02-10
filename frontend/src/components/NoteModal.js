import { useState, useEffect } from "react";
import './NoteModal.css';

export default function NoteModal({
  isOpen,
  onClose,
  onSave,
  initialValue = "",
  title }) {
  
    const [text, setText] = useState(initialValue);

    useEffect(() => {
        if (isOpen) {
            setText(initialValue);
        }
    }, [isOpen, initialValue]);

    if (!isOpen) return null;

    function handleClose() {
        setText("");        // 👈 RESET
        onClose();
    }

    return (
        <div className="modal-overlay">
        <div className="modal">
            <h2>{title}</h2>

            <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write a note..."
            />

            <div className="modal-actions">
            <button onClick={onClose}>Cancel</button>
            <button
                onClick={() => {
                onSave(text);
                handleClose();
                }}
                disabled={!text.trim()}
            >
                Save
            </button>
            </div>
        </div>
        </div>
    );
}