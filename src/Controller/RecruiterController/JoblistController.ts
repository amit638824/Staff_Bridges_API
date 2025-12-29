import { JobPost } from "../../Entities/JobPost";
import { MasterCategory } from "../../Entities/masterCategory";
import { MasterCity } from "../../Entities/masterCity";
import { MasterJobTitle } from "../../Entities/MasterJobTitle";
import { MasterLocality } from "../../Entities/masterLocality";
import { User } from "../../Entities/user";
import { createResponse } from "../../Helpers/response";

export const getRecruiterList = async (req: any, res: any) => {
    try {
        const {
            page = 1,
            limit = 10,

            // Joined table filters
            categoryName,
            titleName,
            cityName,
            cityCode,
            localityName,
            localityCode,
            pinCode,

            // Range filters
            salaryMin,
            salaryMax,
            minExperience,
            maxExperience,
            fromDate,
            toDate,

            // Sorting
            sortBy = "createdAt",
            order = "DESC",

            // Dynamic filters (includes id)
            ...filters
        } = req.query;

        const take = Number(limit) || 10;
        const skip = (Number(page) - 1) * take;

        /* ---------------------------------------------------
           BASE QUERY
        --------------------------------------------------- */
        const baseQB = JobPost.createQueryBuilder("job")
            .leftJoin(MasterCategory, "category", "category.id = job.categoryId")
            .leftJoin(MasterJobTitle, "title", "title.id = job.titleId")
            .leftJoin(User, "user", "user.id = job.recruiterId")
            .leftJoin(MasterCity, "city", "city.id = job.cityId")
            .leftJoin(MasterLocality, "locality", "locality.id = job.localityId");

        /* ---------------------------------------------------
           DYNAMIC FILTER CONFIG
        --------------------------------------------------- */
        const enumFields = [
            "jobType",
            "workLocation",
            "gender",
            "qualification",
            "status",
            "jobPostingFor",
        ];

        const intFields = [
            "id",               // ✅ EXACT JOB ID FILTER
            "recruiterId",
            "categoryId",
            "titleId",
            "cityId",
            "localityId",
            "onlyFresher",
        ];

        /* ---------------------------------------------------
           APPLY DYNAMIC FILTERS
        --------------------------------------------------- */
        Object.entries(filters).forEach(([key, value]) => {
            if (!value) return;

            // CSV support
            if (typeof value === "string" && value.includes(",")) {
                const arr = value.split(",").map(v => v.trim());

                if (intFields.includes(key)) {
                    const intArr = arr.map(Number).filter(v => !isNaN(v));
                    if (intArr.length) {
                        baseQB.andWhere(`job.${key} IN (:...${key})`, {
                            [key]: intArr,
                        });
                    }
                } else {
                    baseQB.andWhere(`job.${key}::text IN (:...${key})`, {
                        [key]: arr,
                    });
                }
            }

            // Integer fields (exact match)
            else if (intFields.includes(key)) {
                const num = Number(value);
                if (!isNaN(num)) {
                    baseQB.andWhere(`job.${key} = :${key}`, { [key]: num });
                }
            }

            // Enum fields
            else if (enumFields.includes(key)) {
                baseQB.andWhere(`job.${key}::text ILIKE :${key}`, {
                    [key]: `%${value}%`,
                });
            }

            // String fallback
            else {
                baseQB.andWhere(`job.${key} ILIKE :${key}`, {
                    [key]: `%${value}%`,
                });
            }
        });

        /* ---------------------------------------------------
           RANGE FILTERS
        --------------------------------------------------- */
        if (salaryMin && !isNaN(Number(salaryMin))) {
            baseQB.andWhere("job.salaryMax >= :salaryMin", {
                salaryMin: Number(salaryMin),
            });
        }

        if (salaryMax && !isNaN(Number(salaryMax))) {
            baseQB.andWhere("job.salaryMin <= :salaryMax", {
                salaryMax: Number(salaryMax),
            });
        }

        if (minExperience && !isNaN(Number(minExperience))) {
            baseQB.andWhere("job.maxExperince >= :minExperience", {
                minExperience: Number(minExperience),
            });
        }

        if (maxExperience && !isNaN(Number(maxExperience))) {
            baseQB.andWhere("job.minExerince <= :maxExperience", {
                maxExperience: Number(maxExperience),
            });
        }

        if (fromDate) {
            baseQB.andWhere("job.createdAt >= :fromDate", {
                fromDate: new Date(fromDate),
            });
        }

        if (toDate) {
            baseQB.andWhere("job.createdAt <= :toDate", {
                toDate: new Date(toDate),
            });
        }

        /* ---------------------------------------------------
           JOINED TABLE FILTERS
        --------------------------------------------------- */
        if (categoryName?.trim()) {
            baseQB.andWhere("category.name ILIKE :categoryName", {
                categoryName: `%${categoryName.trim()}%`,
            });
        }

        if (titleName?.trim()) {
            baseQB.andWhere("title.name ILIKE :titleName", {
                titleName: `%${titleName.trim()}%`,
            });
        }

        if (cityName?.trim()) {
            baseQB.andWhere("city.name ILIKE :cityName", {
                cityName: `%${cityName.trim()}%`,
            });
        }

        if (cityCode?.trim()) {
            baseQB.andWhere("city.code ILIKE :cityCode", {
                cityCode: `%${cityCode.trim()}%`,
            });
        }

        if (localityName?.trim()) {
            baseQB.andWhere("locality.name ILIKE :localityName", {
                localityName: `%${localityName.trim()}%`,
            });
        }

        if (localityCode?.trim()) {
            baseQB.andWhere("locality.code ILIKE :localityCode", {
                localityCode: `%${localityCode.trim()}%`,
            });
        }

        if (pinCode?.trim()) {
            baseQB.andWhere("locality.pinCode ILIKE :pinCode", {
                pinCode: `%${pinCode.trim()}%`,
            });
        }

        /* ---------------------------------------------------
           TOTAL COUNT (NO PAGINATION)
        --------------------------------------------------- */
        const totalRecords = await baseQB.clone().getCount();

        /* ---------------------------------------------------
           SORTING
        --------------------------------------------------- */
        const allowedSort: Record<string, string> = {
            createdAt: "job.createdAt",
            salaryMin: "job.salaryMin",
            salaryMax: "job.salaryMax",
            minExperience: "job.minExerince",
            maxExperience: "job.maxExperince",
        };

        const sortColumn = allowedSort[sortBy] || "job.createdAt";
        const sortOrder = String(order).toUpperCase() === "ASC" ? "ASC" : "DESC";

        /* ---------------------------------------------------
           DATA QUERY
        --------------------------------------------------- */
        const items = await baseQB
            .select([
                "job.id AS job_id",
                "job.recruiterId AS recruiter_id",
                "job.titleId AS title_id",
                "job.categoryId AS category_id",
                "job.hiringForOthers AS hiring_for_others",
                "job.openings AS openings",
                "job.agencyId AS agency_id",

                "job.jobType AS job_type",
                "job.workLocation AS work_location",
                "job.jobPostingFor AS job_posting_for",

                "job.cityId AS city_id",
                "job.localityId AS locality_id",

                "job.gender AS gender",
                "job.qualification AS qualification",

                "job.minExerince AS min_experience",
                "job.maxExperince AS max_experience",
                "job.onlyFresher AS only_fresher",

                "job.salaryBenifits AS salary_benifits",
                "job.salaryMin AS salary_min",
                "job.salaryMax AS salary_max",

                "job.shift AS shift",
                "job.workingDays AS working_days",
                "job.minJobTiming AS minJobTiming",
                "job.maxJobTiming AS maxJobTiming",

                "job.communicationWindow AS communication_window",
                "job.candidateCanCall AS candidate_can_call",
                "job.interviewAddress AS interviewAddress",
                "job.depositeRequired AS depositeRequired",
                "job.verificationRequired AS verification_required",
                "job.status AS status",

                "job.adminComments AS admin_comments",
                "job.description AS description",

                "job.createdAt AS created_at",
                "job.updatedAt AS updated_at",

                "category.id AS category_id",
                "category.name AS category_name",

                "title.id AS job_title_id",
                "title.name AS job_title_name",

                "city.id AS city_id",
                "city.name AS city_name",
                "city.code AS city_code",

                "locality.id AS locality_id",
                "locality.name AS locality_name",
                "locality.code AS locality_code",
                "locality.pinCode AS pin_code",

                "user.companyName AS company",
                "user.companyLogo AS companylogo",
            ])
            .orderBy(sortColumn, sortOrder)
            .limit(take)
            .skip(skip)
            .getRawMany();

        const totalPages = Math.ceil(totalRecords / take);

        return createResponse(res, 200, "Recruiter List", {
            currentPage: Number(page),
            limit: take,
            totalPages,
            totalRecords,
            items,
        });
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Something went wrong", [], true, true);
    }
};
