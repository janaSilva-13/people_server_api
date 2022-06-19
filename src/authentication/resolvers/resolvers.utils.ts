export const handleAuthResolvers: any = () => {
    const resolvers = require('./index')
    return Object.keys(resolvers)
}