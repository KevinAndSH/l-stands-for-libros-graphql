const { buildSchema } = require('graphql')

module.exports = buildSchema(`#graphql
  "Root Query"
  type Query {
    "Hi!"
    hello: String
    "Get a random number between the 2 specified values (0 and 99 by default)"
    random(min: Int, max: Int): Int
    "Get a product by ID"
    product(id: ID!): Product
    "Get all products"
    products: [Product]
    "Get user info by ID"
    user(id: ID!): User
    "Get all users"
    users: [User]
  }

  "A user able to buy and/or sell products"
  type User {
    "A unique user identifier"
    id: ID!
    "The name of the file containing the profile picture"
    img_path: String!
    "A user's first name"
    first_name: String!
    "A user's last name"
    last_name: String!
    "A user can be either buyer or vendor"
    category: String!
    "User's e-mail address"
    email: String!
    "A unique key required to authenticate a user"
    password: String!
  }

  "A product available in our website"
  type Product {
    "A unique product identifier"
    id: ID!
    "The name of the file containing the image of the product"
    img_path: String!
    "The product's name"
    name: String!
    "The name of the human who wrote the book"
    author: String!
    "ISBN Stands For International Standard Book Number"
    isbn: String!
    "Name of the editorial/publishing house"
    house: String!
    "The cost of the product"
    price: Int!
    "A short description of the product's content"
    description: String
    "A list of genres"
    genres: [Genre]
  }

  "Category that distinguish literature based on some stylistic criteria"
  type Genre {
    "A unique genre identifier"
    id: ID!
    "Genre"
    name: String!
    "All products with this genre"
    products: [Product]
  }
`)
