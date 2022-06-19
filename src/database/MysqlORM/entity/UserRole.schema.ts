import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BaseEntity } from "typeorm"

enum Role {
    regular="REGULAR",
    admin="ADMIN"
}

@Entity("user_role")
export class UserRole extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "enum",
        enum: Role,
        default: Role.regular
    })
    role: Role

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
