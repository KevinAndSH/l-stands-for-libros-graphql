const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType
} = require("graphql")
const prisma = require('../prisma-client')

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "A product available in our website",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
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
      type: GraphQLList(GenreType),
      description: "A list of genres",
      resolve: async product => {
        try {
          const queryResult = await prisma.productGenre.findMany({
            where: { product_id: product.id },
            select: { Genres: true }
          })
          return queryResult.map(item => item.Genres)
        } catch (error) {
          throw error          
        }
      }
    }
  })
})

const CategoryType = new GraphQLEnumType({
  name: "Category",
  description: "Either buyer or vendor",
  values: {
    BUYER: {
      value: "buyer",
      description: "User able to purchase products"
    },
    VENDOR: {
      value: "vendor",
      description: "User able to purchase and sell products"
    }
  }
})

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user able to buy and/or sell products",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
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
    full_name: {
      type: GraphQLNonNull(GraphQLString),
      description: "A user's full name",
      resolve: ({ first_name, last_name }) => first_name + " " + last_name
    },
    category: {
      type: GraphQLNonNull(CategoryType),
      description: "A user can be either buyer or vendor"
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's e-mail address"
    }
  })
})

const GenreType = new GraphQLObjectType({
  name: "Genre",
  description: "Category that distinguish literature based on some stylistic criteria",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "A unique genre identifier"
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Genre"
    },
    products: {
      type: GraphQLList(ProductType),
      description: "All products with this genre",
      resolve: async genre => {
        try {
          const queryResult = await prisma.productGenre.findMany({
            where: { genre_id: genre.id },
            select: { Products: true }
          })
          return queryResult.map(item => item.Products)
        } catch (error) {
          throw error          
        }
      }
    }
  })
})


module.exports = { ProductType, UserType, GenreType }