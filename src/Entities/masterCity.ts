import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
 

@Entity({ name: "MasterCity" })
export class MasterCity extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 100 })
    name: string;

    @Column({ name: "stateId", type: "int", default: 1 })
    stateId: number;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

     @Column({ name: "code", type: "varchar", length: 20 })
    code: string;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
