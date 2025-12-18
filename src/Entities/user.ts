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

  @Column({ name: "fullName", type: "varchar", length: 100, nullable: true })
  fullName: any;

  @Column({ name: "email", type: "varchar", length: 100, unique: true, nullable: true })
  email: any;

  @Column({ name: "password", type: "varchar", length: 255, nullable: true })
  password: any;

  @Column({ name: "age", type: "varchar",  nullable: true })
  age: any;

  @Column({ name: "mobile", type: "varchar", length: 15, nullable: true })
  mobile: any;

  @Column({ name: "alternateMobile", type: "varchar", length: 15, nullable: true })
  alternateMobile: any;

  @Column({ name: "RoleId", type: "int", nullable: true })
  RoleId: any;

  @Column({ name: "languagePreference", type: "varchar", length: 20, default: "English" })
  languagePreference: any;

  @Column({ name: "gender", type: "enum", enum: ["Male", "Female", "Other"], default: "Male" })
  gender: any;

  @Column({ name: "experinced", type: "int", default: 0 })
  experinced: any;

  @Column({ name: "countryId", type: "int", nullable: true })
  countryId: any;

  @Column({ name: "companyName",  type: "varchar",  nullable: true }) // id se map krne 
  companyName: any;

  @Column({ name: "profilePic", type: "varchar", nullable: true })
  profilePic: any;

  @Column({ name: "resume", type: "varchar", nullable: true })
  resume: any;

  @Column({ name: "stateId", type: "int", nullable: true })
  stateId: any;

  @Column({ name: "city", type: "varchar", length: 50, nullable: true })
  city: any;

  @Column({ name: "locality", type: "varchar", length: 50, nullable: true })
  locality: any;

  @Column({ name: "latitude", type: "decimal", precision: 10, scale: 6, nullable: true })
  latitude: any;

  @Column({ name: "longitude", type: "decimal", precision: 10, scale: 6, nullable: true })
  longitude: any;

  @Column({ name: "isVerified", type: "int", default: 0 })
  isVerified: any;

  @Column({ name: "isEmailVerified", type: "int", default: 0 })
  isEmailVerified: any;

  @Column({ name: "isMobileVerified", type: "int", default: 0 })
  isMobileVerified: any;

  @Column({ name: "salary", type: "varchar", length: 50, nullable: true })
  salary: any;

  @Column({ name: "education", type: "enum", enum: ["Any", "highschool", "intermediate", "diploma", "graduate", "postgraduate"], default: "highschool", nullable: true, })
  education: string;

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

