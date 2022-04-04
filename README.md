# L STANDS FOR LIBROS - GraphQL API

API from retrieving user and products data.

`src/schema/schemaSDL.js` contains the schema in Schema Definition Language (SDL) and was the first schema I wrote, but this syntax didn't allow me to specify resolve methods for fields not included in the basic query, so I had to switch to the GraphQLSchema syntax (used in `src/schema/index.js` and `src/schema/types.js`), which is more powerful, even if it's a bit less pleasing to the eye.

(Update: I found out later on that you can use the function `makeExecutableSchema` from [`graphql-tools`](https://www.graphql-tools.com) to add resolvers to the schema in a simple way while using the SDL syntax. I'll keep that in mind for future projects 👍)

Prisma was used as our ORM due to its simplicity to use compared to other JavaScript ORMs, thanks to its type support and autocompletion (even without TypeScript), and getting the models in our project is as easy as typing a few lines in the terminal.

You can check it out [here](https://lstandsforlibros-api.herokuapp.com/graphql)!
