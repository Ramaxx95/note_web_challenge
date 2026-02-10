package com.challenge.ensolver.repository;

import com.challenge.ensolver.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByIsArchivedEquals(boolean status);
}
