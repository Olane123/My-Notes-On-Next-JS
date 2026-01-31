"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./NoteComponent.module.css";

interface Note {
    title: string;
    content: string;
    done: boolean;
    createdAt: string;
}

export default function NotesComponent() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isDone, setIsDone] = useState<boolean>(true);
    const [newNoteTitle, setNewNoteTitle] = useState<string>("");

    const notesFieldRef = useRef<HTMLTextAreaElement>(null);
    const inputCheckboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            try {
                const parsedNotes: Note[] = JSON.parse(savedNotes);
                setNotes(parsedNotes);
                if (parsedNotes.length > 0) {
                    selectNote(0);
                }
            } catch (error) {
                console.error("Ошибка при загрузке заметок:", error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        if (notesFieldRef.current) {
            notesFieldRef.current.style.height = 'auto';
            notesFieldRef.current.style.height = `${notesFieldRef.current.scrollHeight}px`;
        }
    }, [currentIndex]);

    const selectNote = (index: number) => {
        setCurrentIndex(index);
        const note = notes[index];

        if (notesFieldRef.current) {
            notesFieldRef.current.value = note.content;
            notesFieldRef.current.style.height = 'auto';
            notesFieldRef.current.style.height = `${notesFieldRef.current.scrollHeight}px`;
        }
    };

    const addTodo = () => {
        const title = newNoteTitle.trim();
        if (title) {
            const createdAt = new Date().toLocaleString('ru-RU');
            const newNote: Note = {
                title,
                content: "",
                done: isDone,
                createdAt
            };

            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            setNewNoteTitle("");
            selectNote(updatedNotes.length - 1);
        }
    };

    const toggleIsDone = () => {
        const newIsDone = !isDone;
        setIsDone(newIsDone);

        if (inputCheckboxRef.current) {
            if (!newIsDone) {
                inputCheckboxRef.current.classList.add(styles.inputCheckboxHidden);
            } else {
                inputCheckboxRef.current.classList.remove(styles.inputCheckboxHidden);
            }
        }
    };

    const toggleNoteDone = () => {
        if (currentIndex >= 0) {
            const updatedNotes = [...notes];
            updatedNotes[currentIndex] = {
                ...updatedNotes[currentIndex],
                done: !updatedNotes[currentIndex].done
            };
            setNotes(updatedNotes);
        }
    };

    const updateNoteContent = (content: string) => {
        if (currentIndex >= 0) {
            const updatedNotes = [...notes];
            updatedNotes[currentIndex] = {
                ...updatedNotes[currentIndex],
                content
            };
            setNotes(updatedNotes);

            if (notesFieldRef.current) {
                notesFieldRef.current.style.height = 'auto';
                notesFieldRef.current.style.height = `${notesFieldRef.current.scrollHeight}px`;
            }
        }
    };

    const deleteNote = () => {
        if (currentIndex >= 0 && window.confirm("Вы уверены, что хотите удалить эту заметку?")) {
            const updatedNotes = notes.filter((_, index) => index !== currentIndex);
            setNotes(updatedNotes);

            if (updatedNotes.length > 0) {
                selectNote(Math.min(currentIndex, updatedNotes.length - 1));
            } else {
                setCurrentIndex(-1);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <div className={styles.inputGeneral}>
                    <div className={styles.inputCheckboxContainer}>
                        <div
                            ref={inputCheckboxRef}
                            className={`${styles.inputCheckbox} ${isDone ? '' : styles.inputCheckboxHidden}`}
                            onClick={toggleIsDone}
                        >
                            {isDone && "✓"}
                        </div>
                    </div>

                    <input
                        type="text"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                        placeholder="Название заметки"
                        className={styles.inputNoteName}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />

                    <button
                        onClick={addTodo}
                        className={styles.inputAddTodo}
                        aria-label="Добавить заметку"
                    >
                        <span style={{ fontSize: '40px', color: '#593B3B' }}>+</span>
                    </button>
                </div>
            </div>

            <div className={styles.notesListContainer}>
                {notes.length === 0 ? (
                    <div className={styles.noNotes}>
                        Нет заметок. Создайте первую!
                    </div>
                ) : (
                    notes.map((note, index) => (
                        <button
                            key={index}
                            className={`${styles.noteButton} ${note.done ? styles.done : ''}`}
                            onClick={() => selectNote(index)}
                        >
                            {note.title}
                        </button>
                    ))
                )}
            </div>

            {currentIndex >= 0 && notes[currentIndex] && (
                <div className={styles.todoContainer}>
                    <div className={styles.noteHeader}>
                        <h2 className={styles.noteName}>
                            {notes[currentIndex].title}
                        </h2>

                        <div className={styles.checkboxContainer}>
                            <div
                                className={`${styles.checkbox} ${notes[currentIndex].done ? '' : styles.checkboxHidden}`}
                                onClick={toggleNoteDone}
                            >
                                {notes[currentIndex].done && "✓"}
                            </div>
                        </div>
                    </div>

                    <p className={styles.noteDate}>
                        Создано: {notes[currentIndex].createdAt}
                    </p>

                    <textarea
                        ref={notesFieldRef}
                        className={styles.notesField}
                        value={notes[currentIndex].content}
                        onChange={(e) => updateNoteContent(e.target.value)}
                        placeholder="Текст заметки..."
                        rows={4}
                    />

                    <button
                        onClick={deleteNote}
                        className={styles.deleteNote}
                    >
                        Удалить заметку
                    </button>
                </div>
            )}
        </div>
    );
}