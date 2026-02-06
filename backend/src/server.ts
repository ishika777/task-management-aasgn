import express from "express";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config({debug: true});


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Backend is alive 🚀");
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
