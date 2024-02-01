const fs = require("fs");
const chalk = require("chalk");

const getNotes = function () {
  return fs.readFileSync("notes.txt", "utf-8");
};

// For adding note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);

  if (!duplicateNotes) {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
    console.log("Note added.");
  } else {
    console.log("Duplicate title does not add.");
  }
};

// For saving notes array in 'notes.json' file
const saveNotes = (notes) => {
  try {
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJson);
  } catch (err) {
    console.error(err.message);
  }
};

// Loading notes from 'notes.json' file
const loadNotes = () => {
  try {
    const dataJson = fs.readFileSync("notes.json", "utf-8");
    return JSON.parse(dataJson);
  } catch (err) {
    return [];
  }
};

// Removing notes from
const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (newNotes.length === notes.length) {
    console.log(chalk.red("No note found."));
  } else {
    console.log(chalk.green(`Note has deleted.`));
    saveNotes(newNotes);
  }
};

// Listing all notes
const listNotes = () => {
  const notes = loadNotes();
  debugger;
  if (!notes.length) {
    console.log("no notes found.");
  } else {
    notes.forEach((note) => {
      console.log(`Title: ${note.title}`);
      console.log(`Body: \n--${note.body}\n`);
    });
  }
};

// Read note by title
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(`Title: ${note[0].title}`);
    console.log(`Body: \n--${note[0].body}\n`);
  } else {
    console.log("no note found.");
  }
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
