import { createServer } from "miragejs";

let server = createServer();
server.get("/api/users", { users: [{ id: 1, name: "Bob" }] });
