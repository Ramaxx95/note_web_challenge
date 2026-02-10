package com.challenge.ensolver.service;

import com.challenge.ensolver.model.Note;
import com.challenge.ensolver.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAllNotes(){
        return noteRepository.findAll();
    }

    public Note createNote(String body){

        Note newNote = new Note();
        newNote.setBody(body);
        newNote.setArchived(false);

        return noteRepository.save(newNote);

    }

    public Note updateNote(Long id, String body){

        Optional<Note> noteFetched = noteRepository.findById(id);
        if (noteFetched.isPresent()){
            noteFetched.get().setBody(body);
            noteRepository.save(noteFetched.get());
            return noteFetched.get();
        }

        return null;

    }

    public Note getNote(Long id){

        Optional<Note> noteFetched = noteRepository.findById(id);
        return noteFetched.orElse(null);

    }

    public void deleteNote(Long id){

        noteRepository.deleteById(id);

    }

    public Note toggleArchiveOf(Long id){

        Optional<Note> noteFetched = noteRepository.findById(id);
        if(noteFetched.isEmpty()){
            return null;
        }
        noteFetched.get().setArchived();
        noteRepository.save(noteFetched.get());

        return noteFetched.get();

    }

    public List<Note> getAllActiveNotes(){
        return noteRepository.findByIsArchivedEquals(false);
    }

    public List<Note> getAllArchivedNotes(){
        return noteRepository.findByIsArchivedEquals(true);
    }

}
