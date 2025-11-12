import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
} from "typeorm";

@Entity({ name: "User" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: any;

  @Column({ name: "uuid", type: "uuid", unique: true })
  @Generated("uuid")
  uuid: any;

  @Column({ name: "fullName", type: "varchar", length: 100 })
  fullName: any;

  @Column({ name: "email", type: "varchar", length: 100, unique: true })
  email: any;

  @Column({ name: "password", type: "varchar", length: 255 })
  password: any;

  @Column({ name: "mobile", type: "varchar", length: 15, nullable: true })
  mobile: any;


  @Column({ name: "RoleId", type: "varchar", nullable: true })
  RoleId: any;

  @Column({ name: "languagePreference", type: "varchar", length: 20, default: "English" })
  languagePreference: any;

  @Column({ name: "gender", type: "enum", enum: ["Male", "Female", "Other"], default: "Male" })
  gender: any;

  @Column({ name: "countryId", type: "int", nullable: true })
  countryId: any;

  @Column({ name: "state_id", type: "int", nullable: true })
  stateId: any;

  @Column({ name: "city", type: "varchar", length: 50, nullable: true })
  city: any;

  @Column({ name: "latitude", type: "decimal", precision: 10, scale: 6, nullable: true })
  latitude: any;

  @Column({ name: "longitude", type: "decimal", precision: 10, scale: 6, nullable: true })
  longitude: any;

  @Column({ name: "isVerified", type: "int", default: 0 })
  isVerified: any;

  @Column({ name: "credits", type: "varchar", length: 50, nullable: true })
  credits: any;

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
