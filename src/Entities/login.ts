import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn, } from "typeorm";

@Entity({ name: "Login" })
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: any;

  @Column({ name: "uuid", type: "varchar", unique: true })
  @Generated("uuid")
  uuid: string;

  // FK → User.id
  @Column({ name: "userId", type: "int",  nullable: true })
  userId: any;

  @Column({ name: "loginMethod", type: "enum", enum: ["MOBILE_OTP", "EMAIL_PASSWORD", "SOCIAL"], default: "EMAIL_PASSWORD" })
  loginMethod: any;

  @Column({
    name: "userRole",
    type: "enum",
    enum: ["JOB_SEEKER", "RECRUITER", "RECRUITMENT_AGENCY", "SUPER_ADMIN", "OPERATIONS_ADMIN", "FINANCE_ADMIN", "SUPPORT_ADMIN",], default: "JOB_SEEKER",
  })
  userRole: any


  @Column({ name: "socialProvider", type: "varchar", length: 50, nullable: true })
  socialProvider: string;

  @Column({ name: "email", type: "varchar", length: 100, nullable: true })
  email: string;

  @Column({ name: "phone", type: "varchar", length: 15, nullable: true })
  phone: string;

  @Column({ name: "password", type: "varchar", length: 255, nullable: true })
  password: string;

  @Column({ name: "otpCode", type: "varchar", length: 10, nullable: true })
  otpCode: string;

  @Column({ name: "loginToken", type: "varchar", length: 10, nullable: true })
  loginToken: string;


  @Column({ name: "otpExpiry", type: "timestamptz", nullable: true })
  otpExpiry: Date;

  @Column({ name: "lastLogin", type: "timestamptz", nullable: true })
  lastLogin: Date;

  @Column({ name: "status", type: "boolean", default: true })
  status: boolean;

  @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", })
  createdAt: Date;

  @Column({
    name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({ name: "createdBy", type: "varchar", length: 50, nullable: true, default: "system", })
  createdBy: string;

  @Column({ name: "updatedBy", type: "varchar", length: 50, nullable: true, default: "system", })
  updatedBy: string;

}
