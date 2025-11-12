import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn, 
} from "typeorm";

@Entity({ name: "MasterPermission" })
export class MasterPermission extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "id" })
  id: any;

  @Column({ name: "key", type: "varchar", length: 50, unique: true })
  key: any;

  @Column({ name: "status", type: "int", default: 1 })
  status: any;

   @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", })
  updatedAt: Date;

  @Column({ name: "createdBy", type: "int", nullable: true })
  createdBy: any;

  @Column({ name: "updatedBy", type: "int", nullable: true })
  updatedBy: any;
}
