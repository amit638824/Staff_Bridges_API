import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";

@Index(
  "UQ_RECRUITER_JOB",
  ["recruiterId", "titleId", "cityId", "jobType"],
  { unique: true }
)
@Entity({ name: "JobPost" })
export class JobPost extends BaseEntity {

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column({ type: "int", name: "recruiterId" })
  recruiterId: number;

  @Column({ type: "int", name: "titleId" })
  titleId: number;

  @Column({ type: "int", name: "categoryId" })
  categoryId: number;

  @Column({ type: "int", default: 1, name: "hiringForOthers" })
  hiringForOthers: number;

  @Column({ type: "int", default: 1, name: "openings" })
  openings: number;

  @Column({ type: "int", nullable: true, name: "agencyId" })
  agencyId: number;

  @Column({
    type: "enum",
    enum: ["Full-time", "Part-time", "Contract"],
    name: "jobType"
  })
  jobType: string;

  @Column({
    type: "enum",
    enum: ["Office", "Field", "WorkFromHome"],
    name: "workLocation"
  })
  workLocation: string;

  @Column({ type: "int", nullable: true, name: "cityId" })
  cityId: number;

  @Column({ type: "int", nullable: true, name: "localityId" })
  localityId: number;

  @Column({
    type: "enum",
    enum: ["Any", "Male", "Female"],
    default: "Any",
    name: "gender"
  })
  gender: string; //

  @Column({
    type: "enum",
    enum: ["Any", "highschool", "intermediate", "diploma", "graduate", "postgraduate"],
    default: "highschool",
    name: "qualification"
  })
  qualification: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0, name: "minExerince" })
  minExerince: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0, name: "maxExperince" })
  maxExperince: number;

  @Column({ type: "int", default: 0, name: "onlyFresher" })
  onlyFresher: number;

  @Column({
    type: "enum",
    enum: ["Fixed", "Fixed + Incentives"],
    default: "Fixed",
    name: "salaryBenifits"
  })
  salaryBenifits: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0, name: "salaryMin" })
  salaryMin: number;


  @Column({
    type: "enum",
    enum: ["Day", "Night ", "Any",],
    default: "Day",
    name: "shift",
    nullable: true,
  })
  shift: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0, name: "salaryMax" })
  salaryMax: number;

  @Column({
    type: "enum",
    enum: ["5", "6", "other"],
    default: "5",
    name: "workingDays"
  })
  workingDays: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0, name: "minJobTiming" })
  minJobTiming: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0, name: "maxJobTiming" })
  maxJobTiming: number;

  @Column({ type: "text", nullable: true, name: "interviewAddress" })
  interviewAddress: string; 

  @Column({ type: "text", array: true, nullable: true, name: "communicationWindow" })
  communicationWindow: string[];

  @Column({ type: "int", default: 0, name: "candidateCanCall" })
  candidateCanCall: number;

  @Column({
    type: "enum",
    enum: ["INDIVIDUAL", "COMPANY"],
    default: "INDIVIDUAL",
    name: "jobPostingFor"
  })
  jobPostingFor: string;

  @Column({ type: "int", default: 0, name: "depositeRequired" })
  depositeRequired: number;

  @Column({ type: "int", default: 0, name: "verificationRequired" })
  verificationRequired: number;

   

  @Column({
    type: "enum",
    enum: ["DRAFT", "UNDER_REVIEW", "APPROVED", "REJECTED", "LIVE"],
    default: "DRAFT",
    name: "status"
  })
  status: string;

  @Column({ type: "text", nullable: true, name: "adminComments" })
  adminComments: string;

  @Column({ type: "text", nullable: true, name: "description" })
  description: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", name: "createdAt" })
  createdAt: Date;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    name: "updatedAt"
  })
  updatedAt: Date;

  @Column({ type: "int", nullable: true, name: "createdBy" })
  createdBy: number;

  @Column({ type: "int", nullable: true, name: "updatedBy" })
  updatedBy: number;
}
