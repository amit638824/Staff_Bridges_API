import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn, } from "typeorm"; 

@Entity({ name: "User" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number; 

  @Column({ name: "uuid", type: "varchar", unique: true })
  @Generated("uuid")
  uuid: string;

@Column({ name: "profile", type: "text", array: true, nullable: true })
profile?: string[];


  @Column({ name: "fullName", type: "varchar", length: 100, nullable: true })
  fullName: string; 

  @Column({ name: "roleId", type: "int", nullable: true })
  roleId: number;

  @Column({ name: "languagePreference", type: "varchar", length: 20, default: "English", })
  languagePreference: string;

  @Column({ name: "city", type: "varchar", length: 50, nullable: true })
  city: string;

  @Column({ name: "locality", type: "varchar", length: 50, nullable: true })
  locality: string;

  @Column({ name: "gender",  type: "enum",  enum: ["Male", "Female", "Other"], default: "Male",  })
  gender: any;

  @Column({ name: "audioResume", type: "varchar", length: 255, nullable: true })
  audioResume: any;

  @Column({  name: "status",  type: "int",  default: 1, })
  status: number;

  @Column({  name: "createdAt",  type: "timestamptz",  default: () => "CURRENT_TIMESTAMP", })
  createdAt: Date;

  @Column({  name: "updatedAt",   type: "timestamptz",  default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
  
  @Column({ name: "createdBy",  type: "varchar", length: 50,  nullable: true, default: "system", })
  createdBy: any;

  @Column({ name: "updatedBy",  type: "varchar",  length: 50, nullable: true, default:  "system", })
  updatedBy: any;
}
