import { User } from '../../database/MysqlORM/entity/User.schema';
import { IContext } from '../interfaces/IContext';
import { sign, verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'

export const createAccessToken = async ( user: User ): Promise<string> => sign({
    user: user.id,
    authorizations: getUserAuthorizations(user)
}, `${process.env.ACCESS_TOKEN_SECRET!}`, {
    expiresIn: '5m'
})

export const createRefreshToken = async (user: User): Promise<string> => sign({
    user: user.id,
    authorizations: getUserAuthorizations(user)
}, `${process.env.AUTH_TOKEN_SECRET!}`, {
    expiresIn: '7d'
})

export const verifyRouteAuthentication: MiddlewareFn<IContext> = ({context}, next) => {
    const authorization = context.req.headers['authorization']

    if(!authorization) {
        throw new Error('Authentication pending...')
    }

    try{
        const token = authorization.split(' ')[1]
        const payload = verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
        context.payload = <any>payload
    }catch(err) {
        throw new Error(err)
    }

    return next()
}

const getUserAuthorizations = (user: User): Array<string> => {
    return ['']
}

// middleware to send routes to the front end, build front end according to users permissions
export const userIsAuthorizedTo = ( authLevel: Array<string> ): Boolean => {
    return true
} 