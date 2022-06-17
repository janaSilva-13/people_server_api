import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm"

@Entity("user")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 200,
        nullable: false
    })
    fullname: string

    @Column({
        type: "varchar",
        length: 200,
        nullable: false,
        unique: true
    })
    username: string

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

    @Column({
        type: "boolean",
        nullable: false,
        default: true
    })
    status: Boolean

    @CreateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)" 
    })
    created_at: Date
 
    @UpdateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" 
    })
    updated_at: Date

}
