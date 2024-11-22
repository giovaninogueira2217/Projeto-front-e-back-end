import express from "express";
import conectarAoBanco from "./src/config/gbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const posts = [
  { descrição: "Uma foto", imgurl: "https://placecats.com/millie/300/150", id: 1 },
  { descrição: "Um gato fofo", imgurl: "https://placekitten.com/200/300", id: 2 },
  { descrição: "Um gato legal", imgurl: "https://placekitten.com/200/300", id: 3 },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor aguardando...");
});

async function getTodosPosts() {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

app.get("/posts", async (req, res) => {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
});

function buscarPostPorId(id) {
  const index = posts.findIndex((post) => post.id === Number(id));
  if (index !== -1) { 
    return posts[index];
  } else {
    
    return res.status(404).send("Post não encontrado");
  }
}
app.get("/posts/:id", (req, res) => {
  const post = buscarPostPorId(req.params.id);
  res.status(200).json(post);
});