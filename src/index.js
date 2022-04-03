require("dotenv").config()
const app = require('./app')

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`GraphQL server running at http://localhost:${PORT}/graphql`))