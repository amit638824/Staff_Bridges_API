export const createResponse = (res: any, statusCode: number = 200, message: string = "OK", data: any = [], success: boolean = true, error: boolean = false) => {
    return res.json({
        success,
        code: statusCode,
        message,
        data,
        error,
    });
}; 

// export const NewAlertVIN = async (req: any, res: any) => {
//     try {
//         // Destructure page, limit, and filters from the request query parameters
//         const { page = 1, limit = 9, ...filters } = req.query;
//         const offset = (Number(page) - 1) * Number(limit); // Calculate pagination offset

//         // Initialize the query builder to fetch VIN records from the vehicle_data table
//         const queryBuilder = VehicleData.createQueryBuilder("vd")
//             .select([
//                 "vd.*", // Select all fields from the vehicle_data table
//                 "masterstate.code AS state", // Get the state name from the masterstate table
//                 "masterbrand.name AS brand",
//                 "masterstate.name AS fullstate",
//                 "masterurl.name AS weburl",   // Get the brand name from the masterbrand table
//             ])
//             .leftJoin(MasterWebUrl, "masterurl", "vd.state = masterurl.code")
//             .leftJoin(MasterState, "masterstate", "vd.state = masterstate.code") // Join masterstate for state names
//             .leftJoin(MasterBrand, "masterbrand", "vd.brand = masterbrand.code")
//             .where("vd.isOld = :isOld", { isOld: false }) // Filter only non-old records
//             .orderBy("vd.titleBrandDate", "DESC") // Order by titleBrandDate in descending order
//             .addOrderBy("vd.alertType", "DESC") // Add secondary ordering by alertType in descending order
//             .limit(Number(limit)) // Limit the number of records based on the passed limit
//             .offset(offset); // Apply pagination offset

//         // Apply dynamic filters from the request query
//         Object.entries(filters).forEach(([key, value]) => {
//             if (value !== undefined && value !== null) {
//                 if (key === "isRead") {
//                     // Handle boolean fields like 'isRead' with proper comparison (no LIKE)
//                     queryBuilder.andWhere(`vd."${key}" = :${key}`, {
//                         [key]: value === "true", // Convert string 'true' to actual boolean true
//                     });
//                 } else {
//                     // Apply LIKE condition for other string fields (case-insensitive search)
//                     queryBuilder.andWhere(`vd."${key}" ILIKE :${key}`, {
//                         [key]: `%${value}%`, // Use ILIKE for case-insensitive matching
//                     });
//                 }
//             }
//         });

//         // Execute the query to fetch VIN records based on the provided filters and pagination
//         const vinRecords = await queryBuilder.getRawMany();

//         // Query builder for counting the total number of VINs based on filters
//         const totalQueryBuilder = VehicleData.createQueryBuilder("vd")
//             .select("COUNT(vd.vin) AS total") // Count distinct VINs
//             .where("vd.isOld = :isOld", { isOld: false }); // Only consider non-old records

//         // Apply the same filters to the total count query
//         Object.entries(filters).forEach(([key, value]) => {
//             if (value !== undefined && value !== null) {
//                 if (key === "isRead") {
//                     totalQueryBuilder.andWhere(`vd."${key}" = :${key}`, {
//                         [key]: value === "true", // Ensure correct boolean comparison
//                     });
//                 } else {
//                     totalQueryBuilder.andWhere(`vd."${key}" ILIKE :${key}`, {
//                         [key]: `%${value}%`, // Apply ILIKE for case-insensitive filtering
//                     });
//                 }
//             }
//         });

//         // Execute the total count query to get the number of VIN records
//         const totalResult = await totalQueryBuilder.getRawOne();
//         const totalVINs = parseInt(totalResult?.total || "0", 10); // Parse the total VINs count
//         const totalPages = Math.ceil(totalVINs / Number(limit)); // Calculate total pages for pagination

//         // Return the response with pagination info and fetched VIN records
//         return createResponse(res, 200, MESSAGES?.DATA_FETCH_SUCCESS, {
//             currentPage: Number(page), // Current page number
//             limit: Number(limit), // Number of records per page
//             totalPages, // Total number of pages
//             totalRecords: totalVINs, // Total number of VIN records
//             items: vinRecords, // The fetched VIN records
//         });
//     } catch (error: any) {
//         // tslint:disable-next-line:no-console 
//         console.log(MESSAGES?.INTERNAL_SERVER_ERROR, error);

//         // Return an error response in case of failure
//         return createResponse(res, 500, MESSAGES?.INTERNAL_SERVER_ERROR, [], false, true);
//     }
// };
