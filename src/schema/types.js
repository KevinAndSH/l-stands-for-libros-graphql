const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql")
const prisma = require('../prisma-client')

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "A product available in our website",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: "A unique product identifier"
    },
    img_path: {
      type: GraphQLNonNull(GraphQLString),
      description: "The name of the file containing the image of the product"
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "The product's name"
    },
    author: {
      type: GraphQLNonNull(GraphQLString),
      description: "The name of the human who wrote the book"
    },
    isbn: {
      type: GraphQLNonNull(GraphQLString),
      description: "ISBN Stands For International Standard Book Number"
    },
    house: {
      type: GraphQLNonNull(GraphQLString),
      description: "Name of the editorial/publishing house"
    },
    price: {
      type: GraphQLNonNull(GraphQLInt),
      description: "The cost of the product"
    },
    description: {
      type: GraphQLString,
      description: "A short description of the product's content"
    },
    genres: {
      type: new GraphQLList(GenreType),
      description: "A list of genres",
      // resolve: product => {
      //   prisma.productGenre.findMany({
      //     select:
      //   })
      // }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user able to buy and/or sell products",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: "A unique user identifier"
    },
    img_path: {
      type: GraphQLNonNull(GraphQLString),
      description: "The name of the file containing the profile picture"
    },
    first_name: {
      type: GraphQLNonNull(GraphQLString),
      description: "A user's first name"
    },
    last_name: {
      type: GraphQLNonNull(GraphQLString),
      description: "A user's last name"
    },
    category: {
      type: GraphQLNonNull(GraphQLString),
      description: "A user can be either buyer or vendor"
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's e-mail address"
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
      description: "A unique key required to authenticate a user"
    },
  })
})

const GenreType = new GraphQLObjectType({
  name: "Genre",
  description: "Category that distinguish literature based on some stylistic criteria",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: "A unique genre identifier"
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Genre"
    },
    products: {
      type: ProductType,
      description: "All products with this genre"
    }
  })
})


module.exports = { ProductType, UserType, GenreType }