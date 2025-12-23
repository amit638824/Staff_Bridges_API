/**
 * @swagger
 * tags:
 *   - name: Recruiter Job Post
 *     description: Manage recruiter job postings (create, update, list, delete)
 *   - name: Recruiter Assets Required
 *     description: Manage recruiter required assets for jobs
 */

/**
 * @swagger
 * /api/recruiter-jobpost-create:
 *   post:
 *     summary: Create a recruiter job post
 *     tags: [Recruiter Job Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recruiterId
 *               - titleId
 *               - categoryId
 *               - jobType
 *               - workLocation
 *             properties:
 *               recruiterId:
 *                 type: number
 *                 example: 1
 *
 *               titleId:
 *                 type: number
 *                 example: 10
 *
 *               categoryId:
 *                 type: number
 *                 example: 5
 *
 *               hiringForOthers:
 *                 type: number
 *                 example: 1
 *
 *               openings:
 *                 type: number
 *                 example: 5
 *
 *               agencyId:
 *                 type: number
 *                 nullable: true
 *                 example: null
 *
 *               jobType:
 *                 type: string
 *                 enum: ["Full-time","Part-time","Contract"]
 *
 *               workLocation:
 *                 type: string
 *                 enum: ["Office","Field","WorkFromHome"]
 *
 *               cityId:
 *                 type: number
 *                 example: 1
 *
 *               localityId:
 *                 type: number
 *                 example: 2
 *
 *               gender:
 *                 type: string
 *                 enum: ["Any","Male","Female"]
 *                 example: "Any"
 *
 *               qualification:
 *                 type: string
 *                 enum: ["Any","highschool","intermediate","diploma","graduate","postgraduate"]
 *                 example: "highschool"
 *
 *               minExerince:
 *                 type: number
 *                 example: 0
 *
 *               maxExperince:
 *                 type: number
 *                 example: 2
 *
 *               onlyFresher:
 *                 type: number
 *                 example: 0
 *
 *               salaryBenifits:
 *                 type: string
 *                 enum: ["Fixed","Fixed + Incentives"]
 *                 example: "Fixed"
 *
 *               salaryMin:
 *                 type: number
 *                 example: 10000
 *
 *               salaryMax:
 *                 type: number
 *                 example: 20000
 *
 *               workingDays:
 *                 type: string
 *                 enum: ["5","6","other"]
 *                 example: "5"
 *
 *               shift:
 *                 type: string
 *                 enum: ["Day","Night","Any"]
 *                 example: "Day"
 *
 *               minJobTiming:
 *                 type: number
 *                 example: 8
 *
 *               maxJobTiming:
 *                 type: number
 *                 example: 18
 *
 *               depositeRequired:
 *                 type: number
 *                 example: 0
 *
 *               interviewAddress:
 *                 type: string
 *                 nullable: true
 *                 example: "Near Metro Station, Delhi"
 *
 *               communicationWindow:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["10:00-12:00","14:00-17:00"]
 *
 *               candidateCanCall:
 *                 type: number
 *                 example: 1
 *
 *               jobPostingFor:
 *                 type: string
 *                 enum: ["INDIVIDUAL","COMPANY"]
 *                 example: "INDIVIDUAL"
 *
 *               verificationRequired:
 *                 type: number
 *                 example: 0
 *
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: "We are hiring field executives"
 *
 *               status:
 *                 type: string
 *                 enum: ["DRAFT","UNDER_REVIEW","APPROVED","REJECTED","LIVE"]
 *                 example: "DRAFT"
 *
 *               adminComments:
 *                 type: string
 *                 nullable: true
 *                 example: "Pending verification"
 *
 *               createdBy:
 *                 type: number
 *                 example: 1
 *
 *               updatedBy:
 *                 type: number
 *                 example: 1
 *
 *               jobSkillsIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1,2,3]
 *
 *               assetsIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1,4]
 *
 *               documetnsIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [2,5]
 *
 *               jobBenitsIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1,3]
 *
 *     responses:
 *       201:
 *         description: Recruiter job created successfully
 *       409:
 *         description: Duplicate job already exists
 *       500:
 *         description: Internal server error
 */

 
/**
 * @swagger
 * /api/recruiter-jobpost-update/{id}:
 *   put:
 *     summary: Update recruiter job post
 *     tags: [Recruiter Job Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleId:
 *                 type: number
 *                 example: 10
 *               categoryId:
 *                 type: number
 *                 example: 5
 *               salaryMin:
 *                 type: number
 *                 example: 12000
 *               salaryMax:
 *                 type: number
 *                 example: 22000
 *     responses:
 *       200:
 *         description: Recruiter job updated successfully
 *       404:
 *         description: Recruiter not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-jobpost-delete/{id}:
 *   delete:
 *     summary: Delete recruiter job post
 *     tags: [Recruiter Job Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: Recruiter job deleted successfully
 *       404:
 *         description: Recruiter not found
 *       500:
 *         description: Internal server error
 */