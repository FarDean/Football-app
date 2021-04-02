import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
	let server = createServer({
		environment,

		models: {
			user: Model,
		},

		seeds(server) {
			server.create("user", { id: 1, name: "Bob" });
			server.create("user", { id: 2, name: "Alice" });
		},

		routes() {
			this.namespace = "api";

			this.get("/users", schema => {
				return schema.users.all();
			});
		},
	});

	return server;
}
