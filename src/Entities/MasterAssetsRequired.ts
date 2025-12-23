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
// ('Lathe Machine', 'Mechanical machine used for metal shaping operations', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Welding Machine', 'Machine used for welding metal components', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Air Compressor', 'Compressed air supply machine for industrial use', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),

// ('Generator', 'Electrical power generator for backup supply', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Transformer', 'Electrical transformer for voltage regulation', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('UPS', 'Uninterruptible power supply for critical equipment', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),

// ('Concrete Mixer', 'Machine used for mixing cement and concrete', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Excavator', 'Heavy equipment used for excavation and digging', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Road Roller', 'Construction vehicle used for road compaction', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),

// ('Company Bike', 'Two-wheeler provided for official field work', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Company Car', 'Four-wheeler used for official transportation', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Delivery Van', 'Vehicle used for material and goods delivery', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),

// ('Fuel Card', 'Fuel card issued for company vehicles', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Hydraulic Jack', 'Mechanical jack used for lifting heavy loads', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
// ('Electrical Control Panel', 'Main electrical distribution and control panel', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

