import "dotenv/config"
import { AppDataSource } from "./data-source"
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolvers/user'
import express from "express"

( async _ => {

    await AppDataSource.initialize().catch(err => {
        throw new Error(err)
    })

    const app = express()

    app.get("/", (_req, res) => {
        res.send("I am up and running babe!")
    })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        })
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app })
    
    app.listen(process.env.DEVELOPMENT_URL, () => {
        console.log('server up and running...')
    })

})()