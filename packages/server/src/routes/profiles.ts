import express, { Request, Response } from "express";
import { Profile } from "../models/profile";
import profiles from "../services/profile-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  profiles
    .index()
    .then((list: Profile[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  //console.log("Extracted name:", req.params.name);

  profiles
    .get(name)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

router.post("/profiles", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});
router.put("/:name", (req: Request, res: Response) => {
  const {name } = req.params;
  const newProfile = req.body;

  profiles
    .update(name, newProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

router.delete("/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  profiles
    .remove(name)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;

