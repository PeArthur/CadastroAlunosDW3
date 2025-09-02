const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const alunosRouter = require("./router"); // seu router reescrito
app.use("/alunos", alunosRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
