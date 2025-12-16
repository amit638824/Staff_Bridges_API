import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "MasterAssets" })
export class MasterAssets extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 100, nullable: true })
    name: string;

    @Column({ name: "description", type: "text", nullable: true })
    description: string;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column({ name: "createdBy", type: "int", nullable: true })
    createdBy: number;

    @Column({ name: "updatedBy", type: "int", nullable: true })
    updatedBy: number;

} 

// INSERT INTO "MasterAssets" 
// ("name", "description", "status", "createdAt", "updatedAt", "createdBy", "updatedBy")
// VALUES
// ('Asset 1', 'Description for Asset 1', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 2', 'Description for Asset 2', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 3', 'Description for Asset 3', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 4', 'Description for Asset 4', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 5', 'Description for Asset 5', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 6', 'Description for Asset 6', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 7', 'Description for Asset 7', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 8', 'Description for Asset 8', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 9', 'Description for Asset 9', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Asset 10', 'Description for Asset 10', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);
