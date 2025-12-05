import { BaseEntity, Column, Entity, PrimaryGeneratedColumn  } from "typeorm"; 

@Entity({ name: "MasterCountry" })
export class MasterCountry extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 100 })
    name: string;

    @Column({ name: "code", type: "varchar", length: 20 })
    code: string;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
 
}

// INSERT INTO "MasterCountry" ("name", "code", "status") 
// VALUES
// ('India', 'IN', 1),
// ('United States', 'US', 1),
// ('United Kingdom', 'UK', 1),
// ('Canada', 'CA', 1),
// ('Australia', 'AU', 1),
// ('Germany', 'DE', 1),
// ('France', 'FR', 1),
// ('Japan', 'JP', 1),
// ('China', 'CN', 1),
// ('Brazil', 'BR', 1);
