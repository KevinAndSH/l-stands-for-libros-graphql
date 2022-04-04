const prisma = require('../prisma-client')
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql")

const { ProductType, UserType, GenreType } = require('./types')

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    hello: {
      type: GraphQLString,
      description: "Hi!",
      resolve: () => "Hello World"
    },

    random: {
      type: GraphQLInt,
      description: "Get a random number between the 2 specified values (0 and 99 by default)",
      args: {
        min: {
          type: GraphQLInt,
          description: "Minimum value to be returned (0 by default)"
        },
        max: {
          type: GraphQLInt,
          description: "Maximum value to be returned (99 by default)"
        }
      },
      resolve: (_, { min, max }) => {
        const [minValue, maxValue] = [min ?? 0, max ?? 99]
        return parseInt(minValue + (maxValue - minValue + 1) * Math.random())
      }
    },

    product: {
      type: ProductType,
      description: "Get a product by ID",
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
          description: "Product ID"
        }
      },
      resolve: (_, { id }) => prisma.products.findUnique({ where: { id: parseInt(id) } }).catch(err => {throw err})
    },

    products: {
      type: GraphQLList(ProductType),
      description: "Get all products",
      args: {
        page: {
          type: GraphQLInt,
          description: "For pagination purposes"
        },
        amount: {
          type: GraphQLInt,
          description: "Amount of entries per page"
        }
      },
      resolve: (_, { page, amount }) => {
        const [pageValue, amountValue] = [page ?? 1, amount ?? 10]
        try {
          return prisma.products.findMany({
            take: amountValue,
            skip: amountValue * (pageValue - 1)
          })
        } catch (error) {
          throw error
        }
      }
    },

    user: {
      type: UserType,
      description: "Get user info by ID",
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
          description: "User ID"
        }
      },
      resolve: (_, { id }) => prisma.users.findUnique({ where: { id: parseInt(id) } }).catch(err => {throw err})
    },

    users: {
      type: GraphQLList(UserType),
      description: "Get all users",
      args: {
        page: {
          type: GraphQLInt,
          description: "For pagination purposes"
        },
        amount: {
          type: GraphQLInt,
          description: "Amount of entries per page"
        }
      },
      resolve: (_, { page, amount }) => {
        const [pageValue, amountValue] = [page ?? 1, amount ?? 10]
        try {
          return prisma.users.findMany({
            take: amountValue,
            skip: amountValue * (pageValue - 1)
          })
        } catch (error) {
          throw error
        }
      }
    },

    genres: {
      type: GraphQLList(GenreType),
      description: "Category that distinguish literature based on some stylistic criteria",
      args: {
        page: {
          type: GraphQLInt,
          description: "For pagination purposes"
        },
        amount: {
          type: GraphQLInt,
          description: "Amount of entries per page"
        }
      },
      resolve: (_, { page, amount }) => {
        const [pageValue, amountValue] = [page ?? 1, amount ?? 10]
        try {
          return prisma.genres.findMany({
            take: amountValue,
            skip: amountValue * (pageValue - 1)
          })
        } catch (error) {
          throw error
        }
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

module.exports = schema