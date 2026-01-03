
/**
 * @swagger
 * /api/recruiter-jobpost-list:
 *   get:
 *     tags:
 *       - Recruiter Job Post
 *     summary: Get recruiter job post list with filters & pagination
 *     description: |
 *       Fetch recruiter job posts with **advanced filtering, pagination, sorting and range-based search**.
 *
 *       ### Supported Filters
 *
 *       **Job Filters**
 *       - `recruiterId`
 *       - `categoryId`
 *       - `titleId`
 *       - `cityId`
 *       - `localityId`
 *       - `jobType`
 *       - `workLocation`
 *       - `gender`
 *       - `qualification`
 *       - `status`
 *       - `onlyFresher`
 *       - `jobPostingFor`
 *
 *       **Joined Table Filters**
 *       - `categoryName` (partial match)
 *       - `titleName` (partial match)
 *       - `cityName` (partial match)
 *       - `cityCode` (partial match)
 *       - `localityName` (partial match)
 *       - `localityCode` (partial match)
 *       - `pinCode` (partial match)
 *
 *       **Range Filters**
 *       - Salary range: `salaryMin`, `salaryMax`
 *       - Experience range: `minExperience`, `maxExperience`
 *       - Date range: `fromDate`, `toDate`
 *
 *       **Sorting**
 *       - `sortBy`: createdAt, salaryMin, salaryMax, minExperience, maxExperience
 *       - `order`: ASC, DESC
 *
 *       🔽 **All enum fields are documented with dropdown values**
 *
 *     parameters:
 *       # ---------------- PAGINATION ----------------
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       # ---------------- BASIC FILTERS ----------------
 *       - in: query
 *         name: recruiterId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: titleId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: localityId
 *         schema:
 *           type: integer
 *
 *       # ---------------- ENUM FILTERS (DROPDOWN) ----------------
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *           enum: [Full-time, Part-time, Contract]
 *
 *       - in: query
 *         name: workLocation
 *         schema:
 *           type: string
 *           enum: [Office, Field, WorkFromHome]
 *
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [Any, Male, Female]
 *
 *       - in: query
 *         name: qualification
 *         schema:
 *           type: string
 *           enum: [Any, highschool, intermediate, diploma, graduate, postgraduate]
 *
 *       - in: query
 *         name: shift
 *         schema:
 *           type: string
 *           enum: [Day, Night, Any]
 *
 *       - in: query
 *         name: workingDays
 *         schema:
 *           type: string
 *           enum: ["5", "6", other]
 *
 *       - in: query
 *         name: salaryBenifits
 *         schema:
 *           type: string
 *           enum: [Fixed, "Fixed + Incentives"]
 *
 *       - in: query
 *         name: jobPostingFor
 *         schema:
 *           type: string
 *           enum: [INDIVIDUAL, COMPANY]
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, UNDER_REVIEW, APPROVED, REJECTED, LIVE]
 *
 *       - in: query
 *         name: onlyFresher
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *           description: 1 = Fresher only, 0 = All
 *
 *       # ---------------- RANGE FILTERS ----------------
 *       - in: query
 *         name: salaryMin
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: salaryMax
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: minExperience
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: maxExperience
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       # ---------------- JOINED TABLE SEARCH ----------------
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: titleName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: cityName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: cityCode
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: localityName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: localityCode
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: pinCode
 *         schema:
 *           type: string
 *
 *       # ---------------- SORTING ----------------
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, salaryMin, salaryMax, minExperience, maxExperience]
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *
 *     responses:
 *       200:
 *         description: Recruiter job list fetched successfully
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/recruiter-best-job-your:
 *   get:
 *     tags:
 *       - Recruiter Job Post
 *     summary: Get recruiter job post list with filters & pagination
 *     description: |
 *       Fetch recruiter job posts with **advanced filtering, pagination, sorting and range-based search**.
 *
 *       ### Supported Filters
 *
 *       **Job Filters**
 *       - `recruiterId`
 *       - `categoryId`
 *       - `titleId`
 *       - `cityId`
 *       - `localityId`
 *       - `jobType`
 *       - `workLocation`
 *       - `gender`
 *       - `qualification`
 *       - `status`
 *       - `onlyFresher`
 *       - `jobPostingFor`
 *
 *       **Joined Table Filters**
 *       - `categoryName` (partial match)
 *       - `titleName` (partial match)
 *       - `cityName` (partial match)
 *       - `cityCode` (partial match)
 *       - `localityName` (partial match)
 *       - `localityCode` (partial match)
 *       - `pinCode` (partial match)
 *
 *       **Range Filters**
 *       - Salary range: `salaryMin`, `salaryMax`
 *       - Experience range: `minExperience`, `maxExperience`
 *       - Date range: `fromDate`, `toDate`
 *
 *       **Sorting**
 *       - `sortBy`: createdAt, salaryMin, salaryMax, minExperience, maxExperience
 *       - `order`: ASC, DESC
 *
 *       🔽 **All enum fields are documented with dropdown values**
 *
 *     parameters:
 *       # ---------------- PAGINATION ----------------
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       # ---------------- BASIC FILTERS ----------------
 *       - in: query
 *         name: recruiterId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: titleId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: localityId
 *         schema:
 *           type: integer
 *
 *       # ---------------- ENUM FILTERS (DROPDOWN) ----------------
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *           enum: [Full-time, Part-time, Contract]
 *
 *       - in: query
 *         name: workLocation
 *         schema:
 *           type: string
 *           enum: [Office, Field, WorkFromHome]
 *
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [Any, Male, Female]
 *
 *       - in: query
 *         name: qualification
 *         schema:
 *           type: string
 *           enum: [Any, highschool, intermediate, diploma, graduate, postgraduate]
 *
 *       - in: query
 *         name: shift
 *         schema:
 *           type: string
 *           enum: [Day, Night, Any]
 *
 *       - in: query
 *         name: workingDays
 *         schema:
 *           type: string
 *           enum: ["5", "6", other]
 *
 *       - in: query
 *         name: salaryBenifits
 *         schema:
 *           type: string
 *           enum: [Fixed, "Fixed + Incentives"]
 *
 *       - in: query
 *         name: jobPostingFor
 *         schema:
 *           type: string
 *           enum: [INDIVIDUAL, COMPANY]
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, UNDER_REVIEW, APPROVED, REJECTED, LIVE]
 *
 *       - in: query
 *         name: onlyFresher
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *           description: 1 = Fresher only, 0 = All
 *
 *       # ---------------- RANGE FILTERS ----------------
 *       - in: query
 *         name: salaryMin
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: salaryMax
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: minExperience
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: maxExperience
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       # ---------------- JOINED TABLE SEARCH ----------------
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: titleName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: cityName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: cityCode
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: localityName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: localityCode
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: pinCode
 *         schema:
 *           type: string
 *
 *       # ---------------- SORTING ----------------
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, salaryMin, salaryMax, minExperience, maxExperience]
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *
 *     responses:
 *       200:
 *         description: Recruiter job list fetched successfully
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/recruiter-similar-jobs:
 *   get:
 *     tags:
 *       - Recruiter Job Post
 *     summary: Get similar jobs based on category
 *     description: |
 *       Fetch **similar job posts** based on the **category of a given job**.
 *
 *       ### How it works
 *       1. Finds the category of the provided `jobId`
 *       2. Returns other jobs from the **same category**
 *       3. Excludes the current job
 *       4. Supports pagination & sorting
 *
 *     parameters:
 *       # ---------------- REQUIRED ----------------
 *       - in: query
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Current job ID to find similar jobs
 *
 *       # ---------------- PAGINATION ----------------
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       # ---------------- SORTING ----------------
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, salaryMin, salaryMax]
 *           example: createdAt
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           example: DESC
 *
 *     responses:
 *       200:
 *         description: Similar jobs fetched successfully
 *       400:
 *         description: jobId is required
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recruiter-choose-from-job-categories:
*   get:
 *     tags:
 *       - Recruiter Job Post
 *     summary: Get recruiter job post list with filters & pagination
 *     description: |
 *       Fetch **job categories with total active job count**.
 *       This API returns **paginated category list** where each category
 *       includes the number of active jobs mapped to it.
 *
 *       ✔ Only active jobs are counted  
 *       ✔ Pagination supported  
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         description: Number of categories per page
 *         schema:
 *           type: integer
 *           example: 10
 *
 *     responses:
 *       200:
 *         description: Category wise job list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 totalRecords:
 *                   type: integer
 *                   example: 25
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category_id:
 *                         type: integer
 *                         example: 4
 *                       category_name:
 *                         type: string
 *                         example: "IT & Software"
 *                       job_count:
 *                         type: integer
 *                         example: 18
 *
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/recruiter-jobs-in-near-by-areas:
 *   get:
 *     tags:
 *       - Recruiter Job Post
 *     summary: Get recruiter job post list with filters & pagination
 *     description: |
 *       Fetch recruiter job posts with **advanced filtering, pagination, sorting and range-based search**.
 *
 *       ### Supported Filters
 *
 *       **Job Filters**
 *       - `recruiterId`
 *       - `categoryId`
 *       - `titleId`
 *       - `cityId`
 *       - `localityId`
 *       - `jobType`
 *       - `workLocation`
 *       - `gender`
 *       - `qualification`
 *       - `status`
 *       - `onlyFresher`
 *       - `jobPostingFor`
 *
 *       **Joined Table Filters**
 *       - `categoryName` (partial match)
 *       - `titleName` (partial match)
 *       - `cityName` (partial match)
 *       - `cityCode` (partial match)
 *       - `localityName` (partial match)
 *       - `localityCode` (partial match)
 *       - `pinCode` (partial match)
 *
 *       **Range Filters**
 *       - Salary range: `salaryMin`, `salaryMax`
 *       - Experience range: `minExperience`, `maxExperience`
 *       - Date range: `fromDate`, `toDate`
 *
 *       **Sorting**
 *       - `sortBy`: createdAt, salaryMin, salaryMax, minExperience, maxExperience
 *       - `order`: ASC, DESC
 *
 *       🔽 **All enum fields are documented with dropdown values**
 *
 *     parameters:
 *       # ---------------- PAGINATION ----------------
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       # ---------------- BASIC FILTERS ----------------
 *       - in: query
 *         name: recruiterId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: titleId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: localityId
 *         schema:
 *           type: integer
 *
 *       # ---------------- ENUM FILTERS (DROPDOWN) ----------------
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *           enum: [Full-time, Part-time, Contract]
 *
 *       - in: query
 *         name: workLocation
 *         schema:
 *           type: string
 *           enum: [Office, Field, WorkFromHome]
 *
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [Any, Male, Female]
 *
 *       - in: query
 *         name: qualification
 *         schema:
 *           type: string
 *           enum: [Any, highschool, intermediate, diploma, graduate, postgraduate]
 *
 *       - in: query
 *         name: shift
 *         schema:
 *           type: string
 *           enum: [Day, Night, Any]
 *
 *       - in: query
 *         name: workingDays
 *         schema:
 *           type: string
 *           enum: ["5", "6", other]
 *
 *       - in: query
 *         name: salaryBenifits
 *         schema:
 *           type: string
 *           enum: [Fixed, "Fixed + Incentives"]
 *
 *       - in: query
 *         name: jobPostingFor
 *         schema:
 *           type: string
 *           enum: [INDIVIDUAL, COMPANY]
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, UNDER_REVIEW, APPROVED, REJECTED, LIVE]
 *
 *       - in: query
 *         name: onlyFresher
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *           description: 1 = Fresher only, 0 = All
 *
 *       # ---------------- RANGE FILTERS ----------------
 *       - in: query
 *         name: salaryMin
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: salaryMax
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: minExperience
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: maxExperience
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       # ---------------- JOINED TABLE SEARCH ----------------
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: titleName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: cityName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: cityCode
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: localityName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: localityCode
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: pinCode
 *         schema:
 *           type: string
 *
 *       # ---------------- SORTING ----------------
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, salaryMin, salaryMax, minExperience, maxExperience]
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *
 *     responses:
 *       200:
 *         description: Recruiter job list fetched successfully
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/recruiter-job-details:
 *   get:
 *     tags:
 *       - Recruiter Job Post
 *     summary: Get recruiter job post list with filters & pagination
 *     description: |
 *       Fetch recruiter job posts with **advanced filtering, pagination, sorting and range-based search**.
 *
 *       ### Supported Filters
 *
 *       **Job Filters**
 *       - `id` (Exact Job Post ID)
 *       - `recruiterId`
 *       - `categoryId`
 *       - `titleId`
 *       - `cityId`
 *       - `localityId`
 *       - `jobType`
 *       - `workLocation`
 *       - `gender`
 *       - `qualification`
 *       - `status`
 *       - `onlyFresher`
 *       - `jobPostingFor`
 *
 *       **Joined Table Filters**
 *       - `categoryName` (partial match)
 *       - `titleName` (partial match)
 *       - `cityName` (partial match)
 *       - `cityCode` (partial match)
 *       - `localityName` (partial match)
 *       - `localityCode` (partial match)
 *       - `pinCode` (partial match)
 *
 *       **Range Filters**
 *       - Salary range: `salaryMin`, `salaryMax`
 *       - Experience range: `minExperience`, `maxExperience`
 *       - Date range: `fromDate`, `toDate`
 *
 *       **Sorting**
 *       - `sortBy`: createdAt, salaryMin, salaryMax, minExperience, maxExperience
 *       - `order`: ASC, DESC
 *
 *     parameters:
 *       # ---------------- PAGINATION ----------------
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       # ---------------- BASIC FILTERS ----------------
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: "Exact Job Post ID (supports CSV: 1,2,3)"
 *
 *       - in: query
 *         name: recruiterId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: titleId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: localityId
 *         schema:
 *           type: integer
 *
 *       # ---------------- ENUM FILTERS ----------------
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *           enum: ["Full-time", "Part-time", "Contract"]
 *
 *       - in: query
 *         name: workLocation
 *         schema:
 *           type: string
 *           enum: ["Office", "Field", "WorkFromHome"]
 *
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: ["Any", "Male", "Female"]
 *
 *       - in: query
 *         name: qualification
 *         schema:
 *           type: string
 *           enum: ["Any", "highschool", "intermediate", "diploma", "graduate", "postgraduate"]
 *
 *       - in: query
 *         name: shift
 *         schema:
 *           type: string
 *           enum: ["Day", "Night", "Any"]
 *
 *       - in: query
 *         name: workingDays
 *         schema:
 *           type: string
 *           enum: ["5", "6", "other"]
 *
 *       - in: query
 *         name: salaryBenifits
 *         schema:
 *           type: string
 *           enum: ["Fixed", "Fixed + Incentives"]
 *
 *       - in: query
 *         name: jobPostingFor
 *         schema:
 *           type: string
 *           enum: ["INDIVIDUAL", "COMPANY"]
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["DRAFT", "UNDER_REVIEW", "APPROVED", "REJECTED", "LIVE"]
 *
 *       - in: query
 *         name: onlyFresher
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: "1 = Fresher only, 0 = All"
 *
 *       # ---------------- RANGE FILTERS ----------------
 *       - in: query
 *         name: salaryMin
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: salaryMax
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: minExperience
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: maxExperience
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *
 *       # ---------------- JOINED TABLE SEARCH ----------------
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: titleName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: cityName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: cityCode
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: localityName
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: localityCode
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: pinCode
 *         schema:
 *           type: string
 *
 *       # ---------------- SORTING ----------------
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: ["createdAt", "salaryMin", "salaryMax", "minExperience", "maxExperience"]
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ["ASC", "DESC"]
 *
 *     responses:
 *       200:
 *         description: Recruiter job list fetched successfully
 *       500:
 *         description: Internal server error
 */
