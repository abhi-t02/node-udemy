import app from "./app.js";

const port = process.env.PORT;

/**
 * @param {number} port
 */
app.listen(port, () => {
  console.log("Server is listening...");
});
