//Gepêto
const express = require("express");
const router = express.Router();
const port = 3000;

const alunos = [];

router.get("/", (req, res) => {
  return res.json(alunos);
});

router.get("/:id", (req, res) => {
  const ra = req.params.id;
  const aluno = alunos.find((alunoAtual) => alunoAtual.ra == ra);

  if (!aluno) return res.status(404).json({ error: "Não foi possível encontrar o aluno!" });

  return res.json(aluno);
});

router.post("/", (req, res) => {
  const { ra, nome, turma, cursos } = req.body;

  const novoAluno = {
    ra,
    nome,
    turma,
    cursos: cursos || [],
  };

  alunos.push(novoAluno);
  return res.status(201).json(novoAluno);
});

router.post("/:id/cursos", (req, res) => {
  const ra = req.params.id;
  const { curso } = req.body;

  const aluno = alunos.find((alunoNovo) => alunoNovo.ra == ra);
  if (!aluno) return res.status(404).json({ error: "Não foi possível encontrar o aluno!" });

  aluno.cursos.push(curso);
  return res.status(201).json(aluno);
});

router.delete("/:id", (req, res) => {
  const ra = req.params.id;
  const tamanhoAntes = alunos.length;

  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].ra == ra) {
      alunos.splice(i, 1);
      return res.status(204).send();
    }
  }

  if (alunos.length === tamanhoAntes) {
    return res.status(404).json({ error: "Não foi possível encontrar o aluno!" });
  }
});

router.delete("/:id/cursos", (req, res) => {
  const ra = req.params.id;
  const { curso } = req.query;

  const aluno = alunos.find((alunoRemovido) => alunoRemovido.ra == ra);
  if (!aluno) return res.status(404).json({ error: "Não foi possível encontrar o aluno!" });

  aluno.cursos = aluno.cursos.filter((cursoAtual) => cursoAtual !== curso);
  return res.status(200).json(aluno);
});

router.put("/:id", (req, res) => {
  const ra = req.params.id;
  const { nome, turma } = req.body;

  const aluno = alunos.find((alunoAtualizar) => alunoAtualizar.ra == ra);
  if (!aluno) return res.status(404).json({ error: "Não foi possível encontrar o aluno!" });

  if (nome) aluno.nome = nome;
  if (turma) aluno.turma = turma;

  return res.json(aluno);
});

router.put("/:id/cursos/:curso", (req, res) => {
  const ra = req.params.id;
  const cursoAntigo = req.params.curso;
  const { curso: novoCurso } = req.body;

  const aluno = alunos.find((alunoAtual) => alunoAtual.ra == ra);
  if (!aluno) return res.status(404).json({ error: "Não foi possível encontrar o aluno!" });

  aluno.cursos = aluno.cursos.map((cursoAtual) => (cursoAtual === cursoAntigo ? novoCurso : cursoAtual));

  return res.json(aluno);
});

module.exports = router;