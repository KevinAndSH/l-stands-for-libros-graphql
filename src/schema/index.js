const prisma = require('../prisma-client')
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql")

const { ProductType, UserType } = require('./types')

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
          type: GraphQLInt,
          description: "Product ID"
        }
      },
      resolve: async (_, { id }) => prisma.products.findFirst({ where: { id } })
    },

    products: {
      type: new GraphQLList(ProductType),
      description: "Get all products",
      resolve: async () => prisma.products.findMany()
    },

    user: {
      type: UserType,
      description: "Get user info by ID",
      args: {
        id: {
          type: GraphQLInt,
          description: "User ID"
        }
      },
      resolve: async (_, { id }) => prisma.users.findUnique({ where: { id } })
    },

    users: {
      type: new GraphQLList(UserType),
      description: "Get all users",
      resolve: async () => prisma.users.findMany()
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

module.exports = schema