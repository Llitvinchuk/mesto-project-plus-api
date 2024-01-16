import express, { NextFunction, Response } from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { IUserRequest } from "types";
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

const mongoose1 = require("mongoose");

const staticUserId = mongoose1.Types.ObjectId("63987f351ae1a5c53f5a453f");

app.use((req: IUserRequest, _, next) => {
  req.user = { _id: staticUserId };
  next();
});
app.use(express.json());

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
