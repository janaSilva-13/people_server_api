import { Resolver, Mutation, Arg, Ctx, Query, UseMiddleware } from 'type-graphql'
import { compare } from 'bcryptjs'
import { User } from '../../../database/MysqlORM/entity/User.schema';
import { createAccessToken, createRefreshToken, verifyRouteAuthentication } from '../../utils/authentication.utils'
import { AuthResponse } from '../../objectTypes/AuthResponse.objectType'
import { IContext } from '../../interfaces/IContext'

@Resolver()
export class Authentication {
    @Query(() => String)
    @UseMiddleware(verifyRouteAuthentication)
    testAthentication(
        @Ctx() {payload}: IContext
    ) {
        console.log(payload.user)
        return `testing authentication route ${payload.user}`
    }
    
    @Mutation(() => AuthResponse)
    async authenticate (
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() {res}: IContext
    ): Promise<AuthResponse> {
        try {
            const user = await User.findOne({where: { username }})
    
            if(!user) {
                throw new Error('User or password is incorrect')
            }
    
            const validPassCode = await compare(password, user.password)
    
            if(!validPassCode) {
                throw new Error('User or password is incorrect')
            }
    
            // Make user login again after predefined inactivity period
            const refreshToken = await  createRefreshToken(user)
            res.cookie('jid', refreshToken, {
                httpOnly: true
            })
    
            const accessToken = await createAccessToken(user)
            return {
                accessToken: accessToken
            }
        }catch(err) {
            throw new Error(err)
        }
    }
}