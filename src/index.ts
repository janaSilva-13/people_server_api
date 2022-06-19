import "dotenv/config"
import { AppDataSource } from "./database/mysqlORM/data-source"
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { handleAuthResolvers } from './authentication/resolvers/resolvers.utils';
import express from "express"

( async _ => {

    const resolvers = <any>handleAuthResolvers()
    await AppDataSource.initialize().catch(err => {throw new Error(err)})
    const app = express()

    app.get("/", (_req, res) => {
        res.send("I am up and running babe!")
    })

    app.post("/refresh_token", ({res}) => {
        res.send("Make refresh token route")
    })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({ resolvers: resolvers }),
        context: ({req, res}) => ({req, res})
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })
    
    app.listen(process.env.DEVELOPMENT_URL, () => {
        console.log('Server up and running...')
    })

})()