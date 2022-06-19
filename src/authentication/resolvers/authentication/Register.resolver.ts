import { Resolver, Mutation, Arg, Query, UseMiddleware, Ctx } from 'type-graphql'
import { hash } from 'bcryptjs'
import { verifyRouteAuthentication } from '../../utils/authentication.utils';
import { IContext } from '../../interfaces/IContext';
import { User } from '../../../database/MysqlORM/entity/User.schema';

@Resolver()
export class Register {
    @Query(() => String)
    @UseMiddleware(verifyRouteAuthentication)
    testRegister(
        @Ctx() {payload}: IContext
    ) {
        return `Testing register user endpoint ${payload.user}`
    }
    
    @Mutation(() => Boolean)
    async register( 
        @Arg('fullname') fullname: string,
        @Arg('username') username: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ){
        try {
            const hashedPassword: string = await hash(password, 12)
            await User.insert({
                fullname: fullname,
                username: username,
                email: email,
                password: hashedPassword
            })
        } catch(err) {
            throw new Error(err)
        }
        return true
    }
}