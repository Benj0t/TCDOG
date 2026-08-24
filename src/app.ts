import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const currentDirectory = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(join(currentDirectory, "public")));

// Data schema & store: TCDOG items / records
const dogs = [
  { id: 1, name: "Max", breed: "Golden Retriever", age: 3 },
  { id: 2, name: "Bella", breed: "German Shepherd", age: 2 },
];

// API Endpoints
app.get("/", (req, res) => {
  res.sendFile(join(currentDirectory, "../public/index.html"));
});

app.get("/api/dogs", (req, res) => {
  res.json(dogs);
});

app.post("/api/dogs", (req, res) => {
  const { name, breed, age } = req.body;
  if (!name || !breed) {
    return res.status(400).json({ error: "Name and breed are required" });
  }
  const newDog = {
    id: dogs.length > 0 ? dogs[dogs.length - 1].id + 1 : 1,
    name,
    breed,
    age: age || 1,
  };
  dogs.push(newDog);
  res.status(201).json(newDog);
});

app.delete("/api/dogs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = dogs.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Dog not found" });
  }
  const deleted = dogs.splice(index, 1);
  res.json(deleted[0]);
});

export default app;