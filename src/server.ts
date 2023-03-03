import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT: number = 3000;

app.use("/health", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
