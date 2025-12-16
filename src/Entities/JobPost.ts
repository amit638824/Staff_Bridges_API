import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "JobPost" })
export class JobPost extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "id", type: "int" }) 
  id: any;

  @Column({ name: "recruiterId", type: "int" })
   recruiterId: any;

  @Column({ name: "titleId", type: "int" }) 
  titleId: any;

  @Column({ name: "categoryId", type: "int" }) 
  categoryId: any;

  @Column({ name: "hiringForOthers", type: "int", default: 1 }) 
  hiringForOthers: any;

  @Column({ name: "openings", type: "int", default: 1 })
   openings: any;

  @Column({ name: "agencyId", type: "int", nullable: true }) 
  agencyId: any;

  @Column({ name: "jobType", type: "enum", enum: ["Full-time", "Part-time", "Contract"] }) 
  jobType: any;

  @Column({ name: "workLocation", type: "enum", enum: ["Office", "Field", "WorkFromHome"] })
   workLocation: any;

  @Column({ name: "cityId", type: "int", nullable: true }) 
  cityId: any;

  @Column({ name: "localityId", type: "int", nullable: true }) 
  localityId: any;

  @Column({ name: "gender", type: "enum", enum: ["Any", "Male", "Female"] }) 
  gender: any;

  @Column({ name: "qualification", type: "enum", enum: ["Any", "highschool", "intermediate", "diploma", "graduate", "postgraduate"], default: "highschool", nullable: true, })
   qualification: any;

  @Column({ name: "minExerince", type: "decimal", precision: 10, scale: 2 }) 
  minExerince: any;

  @Column({ name: "maxExperince", type: "decimal", precision: 10, scale: 2 }) 
  maxExperince: any;

  @Column({ name: "onlyFresher", type: "int", default: 0 }) 
  onlyFresher: any;

  @Column({ name: "salaryBenifits", type: "enum", enum: ["Fixed", "Fixed + Incentives"] })
   salaryBenifits: any;

  @Column({ name: "salaryMin", type: "decimal", precision: 10, scale: 2 })
   salaryMin: any;

  @Column({ name: "salaryMax", type: "decimal", precision: 10, scale: 2 }) 
  salaryMax: any;

  @Column({ name: "jobBenefitsId", type: "text", nullable: true }) 
  jobBenefitsId: any;

  @Column({ name: "workType", type: "varchar", length: 50, nullable: true })
   workType: any;

  @Column({ name: "candiate_special_experince", type: "int", default: 0 }) 
  candiate_special_experince: any;

  @Column({ name: "jobskillsId", type: "int", default: 0 }) 
  jobskillsId: any;

  @Column({ name: "assets_Required", type: "text", nullable: true })
   assets_Required: any;

  @Column({ name: "documents", type: "text", array: true, nullable: true })
   documents: any;

  @Column({ name: "workingDays", type: "enum", enum: ["5", "6", "other"], default: "5" })
   workingDays: any;

  @Column({ name: "interviewAddress", type: "varchar", length: 100, nullable: true }) 
  interviewAddress: any;

  @Column({ name: "communicationWindow", type: "text", array: true, nullable: true }) 
  communicationWindow: any;

  @Column({ name: "candidateCanCall", type: "int", default: 0 }) 
  candidateCanCall: any;

  @Column({ name: "candidate_deposite", type: "int", default: 0 }) 
  candidate_deposite: any;

  @Column({ name: "description", type: "text", nullable: true })
   description: any;

  @Column({ name: "jobPostingFor", type: "enum", enum: ["INDIVIDUAL", "COMPANY"] }) 
  jobPostingFor: any;

  @Column({ name: "verificationRequired", type: "int", default: 0 }) 
  verificationRequired: any;

  @Column({ name: "status", type: "enum", enum: ["DRAFT", "UNDER_REVIEW", "APPROVED", "REJECTED", "LIVE"], default: "DRAFT" })
   status: any;

  @Column({ name: "adminComments", type: "text", nullable: true }) 
  adminComments: any;

  @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" }) 
  createdAt: Date;

  @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }) 
  updatedAt: Date;

  @Column({ name: "createdBy", type: "int", nullable: true }) 
  createdBy: any;

  @Column({ name: "updatedBy", type: "int", nullable: true })
   updatedBy: any;
}
