import express, { Request, Response } from "express";
import profiles from "./routes/profiles";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";
import path from "path";

connect("music");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/profiles", authenticateUser, profiles);
app.use("/auth", auth);

const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

// HTML Routes:
app.get("/hello", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// app.post("/profiles", (req: Request, res: Response) => {
//   const newProfile = req.body;

//   profiles.create(newProfile)
//     .then((profile: Profile) => res.status(201).send(profile))
//     .catch((err) => res.status(500).send(err));
// });




// import express, { Request, Response, Router } from "express";
// import profiles from "./routes/profiles";
// import { connect } from "./services/mongo";

// // Mongo Connection
// connect("music");

// const app = express();
// const port = process.env.PORT || 3000;
// const staticDir = process.env.STATIC || "public";

// // Middleware:
// app.use(express.static(staticDir));
// app.use(express.json());

// // API Routes:
// app.use("/api/profiles", profiles);

// // HTML Routes:
// app.get("/hello", (_: Request, res: Response) => {
//   res.send(
//     `<h1>Hello!</h1>
//      <p>Server is up and running.</p>
//      <p>Serving static files from <code>${staticDir}</code>.</p>
//     `
//   );
// });

// Router.post("/profiles", (req: Request, res: Response) => {
//   const newProfile = req.body;

//   profiles
//     .create(newProfile)
//     .then((profile: Profile) => res.status(201).send(profile))
//     .catch((err) => res.status(500).send(err));
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

