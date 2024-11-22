    import express from  "express";

    const posts = [
      { descrição: "Uma foto", imgurl: "https://placecats.com/millie/300/150", id: 1 },
      { descrição: "Um gato fofo", imgurl: "https://placekitten.com/200/300", id: 2 },
      { descrição: "Um gato legal", imgurl: "https://placekitten.com/200/300", id: 3 },
      
    ];

    const app = express();
    app.use(express.json());

    app.listen(3000, () => {
    console.log ("Servidor escutando...");
    });
  
    app.get("/posts", (req, res) => {
    res.status(200) .json (posts);
  });

  function buscarpostporid(id){
    return posts.findIndex((post) => {
      return post.id === Number(id)
    });
  }
  app.get("/posts/:id", (req, res) => {
    const index = buscarpostporid(req.params.id)
    res.status(200) .json (posts[index]);
  });

