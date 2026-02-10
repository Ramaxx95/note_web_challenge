package com.challenge.ensolver.controller;

import com.challenge.ensolver.model.Note;
import com.challenge.ensolver.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping("/notes")
    public ResponseEntity<List<Note>> getNotes(){

        return new ResponseEntity<>(noteService.getAllNotes(), HttpStatus.OK);

    }

    @PostMapping("/notes")
    public ResponseEntity<Note> createNote(@RequestBody String body){

        return new ResponseEntity<>(noteService.createNote(body), HttpStatus.CREATED);

    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody String body){

        Note updatedNote = noteService.updateNote(id, body);
        if(updatedNote == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updatedNote, HttpStatus.OK);

    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Note> deleteNote(@PathVariable Long id){

        if(noteService.getNote(id) == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        noteService.deleteNote(id);
        return new ResponseEntity<>(null, HttpStatus.OK);

    }

    @PatchMapping("/notes/{id}/archive")
    public ResponseEntity<Note> toggleArchiveStatus(@PathVariable Long id){

        Note archivedNote = noteService.toggleArchiveOf(id);
        if(archivedNote == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(archivedNote, HttpStatus.OK);

    }

    @GetMapping("/notes/active")
    public ResponseEntity<List<Note>> getActiveNotes(){

        return new ResponseEntity<>(noteService.getAllActiveNotes(), HttpStatus.OK);

    }

    @GetMapping("/notes/archive")
    public ResponseEntity<List<Note>> getArchivedNotes(){

        return new ResponseEntity<>(noteService.getAllArchivedNotes(), HttpStatus.OK);

    }
}
