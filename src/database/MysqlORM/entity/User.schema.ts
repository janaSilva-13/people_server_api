import { Field, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm"

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

    @Field(() => String)
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field(() => String)
    @Column({
        type: "varchar",
        length: 200,
        nullable: false
    })
    fullname: string

    @Field(() => String)
    @Column({
        type: "varchar",
        length: 200,
        nullable: false,
        unique: true
    })
    username: string

    @Field(() => String)
    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    email: string

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    password: string

    @Field(() => Boolean)
    @Column({
        type: "boolean",
        nullable: false,
        default: true
    })
    status: Boolean

    @Field(() => String)
    @CreateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)" 
    })
    created_at: Date
 
    @Field(() => String)
    @UpdateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" 
    })
    updated_at: Date

}
