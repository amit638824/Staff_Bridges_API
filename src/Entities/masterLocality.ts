import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "MasterLocality" })
export class MasterLocality extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 150 })
    name: string;

    @Column({ name: "code", type: "varchar", length: 20 })   // <-- ADDED
    code: string;

    @Column({ name: "cityId", type: "int" })
    cityId: number;

    @Column({ name: "pinCode", type: "varchar", length: 10, nullable: true })
    pinCode: string;

    @Column({ name: "status", type: "int", default: 1 })
    status: number;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
} 

// //  INSERT INTO "MasterLocality" 
// ("name", "code", "cityId", "pinCode", "status") 
// VALUES
// ('Hazratganj', 'HZRT', 625, '226001', 1),
// ('Aliganj', 'ALGN', 625, '226024', 1),
// ('Indira Nagar', 'INDR', 625, '226016', 1),
// ('Gomti Nagar', 'GMTI', 625, '226010', 1),
// ('Gomti Nagar Extension', 'GMTX', 625, '226010', 1),
// ('Mahanagar', 'MHNG', 625, '226006', 1),
// ('Janakipuram', 'JNPR', 625, '226021', 1),
// ('Alambagh', 'ALMB', 625, '226005', 1),
// ('Aminabad', 'AMNB', 625, '226018', 1),
// ('Chowk', 'CHWK', 625, '226003', 1),
// ('Rajajipuram', 'RJJP', 625, '226017', 1),
// ('Charbagh', 'CRBG', 625, '226004', 1),
// ('Saheed Path', 'SHPT', 625, '226002', 1),
// ('Vikas Nagar', 'VKNG', 625, '226022', 1),
// ('Kalyanpur', 'KLYP', 625, '226015', 1),
// ('Ashiyana', 'ASHY', 625, '226012', 1),
// ('Telibagh', 'TLBH', 625, '226025', 1),
// ('Krishna Nagar', 'KRNG', 625, '226023', 1),
// ('Chinhat', 'CHHT', 625, '226028', 1),
// ('Dubagga', 'DBGG', 625, '226101', 1);

