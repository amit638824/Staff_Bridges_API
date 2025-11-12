import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated 
} from "typeorm"; 

@Entity({ name: "logins" })
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: any;

  @Column({ name: "uuid", type: "uuid", unique: true })
  @Generated("uuid")
  uuid: any;

@Column({ name: "userId", type: "varchar", length: 50, nullable: true })
  userId: any;

  @Column({  name: "loginMethod",   type: "enum", enum: ["MOBILE_OTP", "EMAIL_PASSWORD", "SOCIAL"], default: "EMAIL_PASSWORD", })
  loginMethod: any;

  @Column({ name: "socialProvider", type: "varchar", length: 50, nullable: true })
  socialProvider: any;

  @Column({ name: "otpCode", type: "varchar", length: 10, nullable: true })
  otpCode: any;

  @Column({ name: "loginToken", type: "varchar", length: 10, nullable: true })
  loginToken: any;

  @Column({ name: "otpExpiry", type: "timestamptz", nullable: true })
  otpExpiry: Date;

  @Column({ name: "lastLogin", type: "timestamptz", nullable: true })
  lastLogin: Date;

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
