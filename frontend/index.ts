import { Express, request, response, Router } from "express";
import bcrypt from "bcrypt";
import { collections } from "../backend/src/database/database";
import express from "express";
import path from "path";

const router = Router();
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../entrar.html"));
});

app.post("/api/register", async (request, response) => {
  try {
    const { username, password, email } = request.body;

    // Validação
    if (!username || !password || !email) {
      return response.status(400).json({ error: "Preencha todos os campos!" });
    }

    const userExists = await collections.users?.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return response
        .status(400)
        .json({ error: "Usuário ou E-mail já cadastrados." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      status: "offline",
      createdAt: new Date(),
    };

    const result = await collections.users?.insertOne(newUser);

    if (result) {
      return response
        .status(201)
        .json({ message: "Usuário criado com sucesso!" });
    }
  } catch (error) {
    console.error("Erro no registro do Howlira:", error);
    return response.status(500).json({ error: "Erro interno no servidor." });
  }
});

app.listen(port, () => {
  console.log(`Howlira rodando em http://localhost:${port}`);
});
