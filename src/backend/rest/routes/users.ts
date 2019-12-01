import { Router, Request, Response } from "express";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  return res.json([
    { name: "tola", address: "18, Ogunnaike Street", age: 45 },
    { name: "Doglass", address: "10, Shonaike Street", age: 45 },
    { name: "Peter", address: "12, Balogun Street", age: 45 },
    { name: "steve", address: "8, Hassan Street", age: 45 }
  ]);
});

export default router;
