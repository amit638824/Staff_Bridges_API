import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "MasterCategory" })
export class MasterCategory extends BaseEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 100, nullable: true })
    name: string;

    @Column({ name: "image", type: "text", nullable: true })
    image: string;

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


// INSERT INTO "MasterCategory"
// ("name", "image", "description", "status", "createdAt", "updatedAt", "createdBy", "updatedBy")
// VALUES
// (
//   'IT & Software',
//   'https://cdn-icons-png.flaticon.com/512/2920/2920244.png',
//   'Software development, IT services and technology roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'Sales & Marketing',
//   'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
//   'Sales, marketing and business development roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'Finance & Accounting',
//   'https://cdn-icons-png.flaticon.com/512/2621/2621043.png',
//   'Accounting, finance, taxation and audit roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'HR & Administration',
//   'https://cdn-icons-png.flaticon.com/512/1995/1995574.png',
//   'Human resources, payroll and administrative roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'Content & Media',
//   'https://cdn-icons-png.flaticon.com/512/3665/3665923.png',
//   'Content writing, media, editing and creative roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'Customer Support',
//   'https://cdn-icons-png.flaticon.com/512/3059/3059518.png',
//   'Customer service, call center and support roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'Operations',
//   'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
//   'Operations, supply chain and process management roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'Design & Creative',
//   'https://cdn-icons-png.flaticon.com/512/1006/1006555.png',
//   'UI/UX, graphic and creative design roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'Engineering',
//   'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
//   'Core engineering and technical roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// ),
// (
//   'Healthcare',
//   'https://cdn-icons-png.flaticon.com/512/2966/2966482.png',
//   'Medical, healthcare and wellness roles',
//   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1
// );
