const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const authMiddleware = require("../../middleware/authMiddleware");

const setupGraphQL = async (app) => {
    try {
        console.log("✅ GraphQL schema loaded");

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: async ({ req }) => {

                if (!req || !req.headers) {
                    return { user: null };
                }

                try {
                    if (!req.headers.authorization) {
                        return { user: null };
                    }

                    const user = await authMiddleware(req.headers);
                    return { user };
                } catch (error) {
                    return { user: null };
                }
            }
        });

        await server.start();
        server.applyMiddleware({
            app,
            path: "/graphql",
            cors: {
                origin: ["http://localhost:5173"],
                credentials: true,
            },
        });

    } catch (error) {
        console.error("❌ Error initializing Apollo Server:", error.message);
    }
};

module.exports = { setupGraphQL };

