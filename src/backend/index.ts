import doten from "dotenv";
doten.config();
import path from "path";
import { merge } from "lodash";
import express, { Application } from "express";
import cors from "cors";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
//REST
import UserRoutes from "./rest/routes/users";

//Schemas
import {
  typeDef as rootTypeDef,
  resolver as rootResolver
} from "./graphql/schemas/root";
import {
  typeDef as userTypeDef,
  resolver as userResolver
} from "./graphql/schemas/user";
import {
  typeDef as measurementTypeDef,
  resolver as measurementResolver
} from "./graphql/schemas/measurement";
import {
  typeDef as authTypeDef,
  resolver as authResolver
} from "./graphql/schemas/auth";

// eslint-disable-next-line no-undef
const PORT = process.env.SERVER_PORT;
const app: Application = express();

const base = path.dirname(process.argv[1]);

// eslint-disable-next-line no-undef
const pub = path.join(base, "public");
const corsOptions = {
  origin: "http://localhost:*",
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(pub));
app.use("/api", UserRoutes);

//Build GraphQL schema based on SDL definitions and resolvers maps
const schema = makeExecutableSchema({
  typeDefs: [rootTypeDef, userTypeDef, measurementTypeDef, authTypeDef],
  resolvers: merge(
    rootResolver,
    userResolver,
    measurementResolver,
    authResolver
  )
});

// Build Apollo server
const apolloServer = new ApolloServer({ schema });
apolloServer.applyMiddleware({ app, path: "/gql" });

// Run server
app.listen(PORT, () =>
  console.log(
    `App running at http://localhost:${PORT} and graphql path is ${apolloServer.graphqlPath}`
  )
);
