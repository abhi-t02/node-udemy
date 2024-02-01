const chalk = require("chalk");
const {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote,
} = require("./notes.js");
const yargs = require("yargs");

// customize yargs version
yargs.version("1.1.0");

// Create add command
yargs
  .command(
    "add",
    "Adding new note",
    (yargs) => {
      yargs
        .option("body", {
          demandOption: true,
          describe: "Body name",
          type: "string",
        })
        .option("title", {
          describe: "Title name",
          demandOption: true,
          type: "string",
        });
    },
    (argv) => {
      addNote(argv.title, argv.body);
    }
  )

  // removing command
  .command(
    "remove",
    "Remove a note",
    (yargs) => {
      yargs.option("title", {
        demandOption: true,
        type: "string",
        describe: "Title name",
      });
    },
    (argv) => {
      removeNote(argv.title);
    }
  )

  // Listing command
  .command(
    "list",
    "Listing all note",
    (yargs) => {
      yargs.option("title", {});
    },
    (argv) => {
      listNotes();
    }
  )

  // Reading command
  .command(
    "read",
    "Read a note",
    (yargs) => {
      yargs.option("title", {
        demandOption: true,
        type: "string",
        describe: "reading a note",
      });
    },
    (argv) => {
      readNote(argv.title);
    }
  )
  .help().argv;
