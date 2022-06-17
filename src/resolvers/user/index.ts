import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { hash } from 'bcryptjs'

@Resolver()
export class UserResolver {
    @Query(() => String)
    hey() {
        return 'hey there :)'
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('fullname') fullname: string,
        @Arg('username') username: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ){
        await User.insert({
            fullname,
            username,
            email,
            password
        })
        return true
    }
}