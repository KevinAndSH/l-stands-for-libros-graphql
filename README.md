# L STANDS FOR LIBROS - GraphQL API

API from retrieving user and products data.

`src/schema/schemaSDL.js` contains the schema in Schema Definition Language (SDL) and was the first schema I wrote, but this syntax didn't allow me to specify resolve methods for fields not included in the basic query, so I had to switch to the GraphQLSchema syntax (used in `src/schema/index.js` and `src/schema/types.js`), which is more powerful, even if it's a bit less pleasing to the eye.
