import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity({ name: "RateUs" })
export class RateUs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "userId", type: "int", nullable: false })
    userId: number; 
    // If it should store values like "4.5", use decimal
    @Column({ 
        name: "rating", 
        type: "decimal", 
        precision: 3, 
        scale: 1, 
        nullable: true,
        default: 0 
    })
    rating: number; 
    
    @Column({ 
        name: "description", 
        type: "varchar", 
        length: 500,
        nullable: true 
    })
    description: string;

    @Column({ 
        name: "status", 
        type: "int", 
        default: 0 
    })
    status: number;

    @CreateDateColumn({ 
        name: "createdAt", 
        type: "timestamptz", 
        default: () => "CURRENT_TIMESTAMP" 
    })
    createdAt: Date;

    @UpdateDateColumn({ 
        name: "updatedAt", 
        type: "timestamptz", 
        default: () => "CURRENT_TIMESTAMP" 
    })
    updatedAt: Date;

    @Column({ 
        name: "createdBy", 
        type: "int", 
        nullable: true 
    })
    createdBy: number;

    @Column({ 
        name: "updatedBy", 
        type: "int", 
        nullable: true 
    })
    updatedBy: number;
}