import { MasterCity } from "../../Entities/masterCity";
import { MasterCountry } from "../../Entities/masterCountry";
import { MasterLocality } from "../../Entities/masterLocality";
import { MasterState } from "../../Entities/masterState";
import { MESSAGES } from "../../Helpers/constants";
import { createResponse } from "../../Helpers/response";

export const createCountry = async (req: any, res: any) => {
    try {
        const { name, code, status } = req.body; 
        if (!name || !code) {
            return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
        } 
        const existing = await MasterCountry.findOne({
            where: [{ name }, { code }]
        }); 
        if (existing) {
            return createResponse(res, 409, MESSAGES.COUNTRY_ALREADY_EXISTS, [], true, true);
        } 
        const country = MasterCountry.create({
            name,
            code,
            status: status ?? 1
        }); 
        await country.save(); 
        return createResponse(res, 201, MESSAGES.COUNTRY_CREATED, country); 
    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};


// UPDATE COUNTRY
export const updateCountry = async (req: any, res: any) => {
    try {
        const country = await MasterCountry.findOne({ where: { id: Number(req.params.id) } });
        if (!country) {
            return createResponse(res, 404, MESSAGES.COUNTRY_NOT_FOUND, []);
        }

        const { name, code, status } = req.body;

        country.name = name ?? country.name;
        country.code = code ?? country.code;
        country.status = status ?? country.status;
        await country.save();

        return createResponse(res, 200, MESSAGES.COUNTRY_UPDATED, country);
    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// DELETE COUNTRY
export const deleteCountry = async (req: any, res: any) => {
    try {
        const country = await MasterCountry.findOne({ where: { id: Number(req.params.id) } });
        if (!country) {
            return createResponse(res, 404, MESSAGES.COUNTRY_NOT_FOUND, []);
        }

        await MasterCountry.remove(country);

        return createResponse(res, 200, MESSAGES.COUNTRY_DELETED, []);
    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
}; 

// CREATE STATE
export const createState = async (req: any, res: any) => {
    try {
        const { name, code, countyId, status } = req.body;
        if (!name || !code || !countyId) return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);

        // Duplicate check
        const existing = await MasterState.findOne({ where: [{ name }, { code }] });
        if (existing) return createResponse(res, 409, MESSAGES.STATE_ALREADY_EXISTS, [], true, true);

        const state = MasterState.create({ name, code, countyId, status: status ?? 1 });
        await state.save();

        return createResponse(res, 201, MESSAGES.STATE_CREATED, state);
    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
 

 
// UPDATE STATE
export const updateState = async (req: any, res: any) => {
    try {
        const state = await MasterState.findOne({ where: { id: Number(req.params.id) } });
        if (!state) return createResponse(res, 404, MESSAGES.STATE_NOT_FOUND, []);

        const { name, code, countyId, status } = req.body;

        state.name = name ?? state.name;
        state.code = code ?? state.code;
        state.countyId = countyId ?? state.countyId;
        state.status = status ?? state.status;

        await state.save();

        return createResponse(res, 200, MESSAGES.STATE_UPDATED, state);
    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// DELETE STATE
export const deleteState = async (req: any, res: any) => {
    try {
        const state = await MasterState.findOne({ where: { id: Number(req.params.id) } });
        if (!state) return createResponse(res, 404, MESSAGES.STATE_NOT_FOUND, []);

        await MasterState.remove(state);

        return createResponse(res, 200, MESSAGES.STATE_DELETED, []);
    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
 
export const createCity = async (req: any, res: any) => {
    try {
        const { name, code, stateId, status } = req.body;

        if (!name || !code || !stateId)
            return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);

        // Duplicate Check
        const existing = await MasterCity.findOne({
            where: [{ name }, { code }]
        });

        if (existing)
            return createResponse(res, 409, MESSAGES.CITY_ALREADY_EXISTS, [], true, true);

        const city = MasterCity.create({
            name,
            code,
            stateId,
            status: status ?? 1
        });

        await city.save();

        return createResponse(res, 201, MESSAGES.CITY_CREATED, city);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};



export const updateCity = async (req: any, res: any) => {
    try {
        const city = await MasterCity.findOne({
            where: { id: Number(req.params.id) }
        });

        if (!city)
            return createResponse(res, 404, MESSAGES.CITY_NOT_FOUND, []);

        const { name, code, stateId, status } = req.body;

        city.name = name ?? city.name;
        city.code = code ?? city.code;
        city.stateId = stateId ?? city.stateId;
        city.status = status ?? city.status;

        await city.save();

        return createResponse(res, 200, MESSAGES.CITY_UPDATED, city);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

export const deleteCity = async (req: any, res: any) => {
    try {
        const city = await MasterCity.findOne({
            where: { id: Number(req.params.id) }
        });

        if (!city)
            return createResponse(res, 404, MESSAGES.CITY_NOT_FOUND, []);

        await MasterCity.remove(city);

        return createResponse(res, 200, MESSAGES.CITY_DELETED, []);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};
 
// ================= CREATE LOCALITY =================
export const createLocality = async (req: any, res: any) => {
  try {
    const { name, code, cityId, status } = req.body;

    if (!name || !code || !cityId) {
      return createResponse(res, 400, MESSAGES.REQUIRED_FIELDS, [], true, true);
    }

    // Duplicate check: name + code + cityId
    const existing = await MasterLocality.findOne({
      where: [
        { name, cityId },
        { code, cityId }
      ]
    });

    if (existing) {
      return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Locality"), [], true, true);
    }

    const locality = MasterLocality.create({
      name,
      code,
      cityId,
      status: status ?? 1
    });

    await locality.save();

    return createResponse(res, 201, MESSAGES.LOCALITY_CREATED, locality);

  } catch (error) {
    console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
}; 
// ================= UPDATE LOCALITY =================
export const updateLocality = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, code, cityId, status } = req.body;

    const locality = await MasterLocality.findOne({ where: { id: Number(id) } });

    if (!locality) {
      return createResponse(res, 404, MESSAGES.LOCALITY_NOT_FOUND, [], true, true);
    }

    // Duplicate check if name/code or cityId changes
    if ((name && name !== locality.name) || (code && code !== locality.code) || (cityId && cityId !== locality.cityId)) {
      const duplicate = await MasterLocality.findOne({
        where: [
          { name: name ?? locality.name, cityId: cityId ?? locality.cityId },
          { code: code ?? locality.code, cityId: cityId ?? locality.cityId }
        ]
      });
      if (duplicate) {
        return createResponse(res, 409, MESSAGES.ALREADY_EXISTS("Locality"), [], true, true);
      }
    }

    locality.name = name ?? locality.name;
    locality.code = code ?? locality.code;
    locality.cityId = cityId ?? locality.cityId;
    locality.status = status ?? locality.status;

    await locality.save();

    return createResponse(res, 200, MESSAGES.LOCALITY_UPDATED, locality);

  } catch (error) {
    console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};

// ================= DELETE LOCALITY =================
export const deleteLocality = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const locality = await MasterLocality.findOne({ where: { id: Number(id) } });

    if (!locality) {
      return createResponse(res, 404, MESSAGES.LOCALITY_NOT_FOUND, [], true, true);
    }

    await MasterLocality.remove(locality);

    return createResponse(res, 200, MESSAGES.LOCALITY_DELETED, []);

  } catch (error) {
    console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
}; 

// ================= GET ALL LOCALITIES WITH FILTERS + PAGINATION =================
export const getAllLocalities = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10, cityId, ...filters } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const qb = MasterLocality.createQueryBuilder("locality")
      .select([
        "locality.id",
        "locality.name",
        "locality.code",
        "locality.cityId",
        "locality.status",
        "locality.createdAt",
        "locality.updatedAt"
      ])
      .orderBy("locality.id", "ASC")
      .limit(Number(limit))
      .offset(offset);

    // Filter by cityId
    if (cityId) {
      qb.andWhere("locality.cityId = :cityId", { cityId: Number(cityId) });
    }

    // Dynamic filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (["id", "cityId", "status"].includes(key)) {
          qb.andWhere(`locality."${key}" = :${key}`, { [key]: Number(value) });
        } else {
          qb.andWhere(`locality."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
        }
      }
    });

    const items = await qb.getMany();

    // Total count query
    const totalQB = MasterLocality.createQueryBuilder("locality")
      .select("COUNT(locality.id)", "total");

    if (cityId) {
      totalQB.andWhere("locality.cityId = :cityId", { cityId: Number(cityId) });
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (["id", "cityId", "status"].includes(key)) {
          totalQB.andWhere(`locality."${key}" = :${key}`, { [key]: Number(value) });
        } else {
          totalQB.andWhere(`locality."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
        }
      }
    });

    const totalResult = await totalQB.getRawOne();
    const totalRecords = parseInt(totalResult.total || "0", 10);
    const totalPages = Math.ceil(totalRecords / Number(limit));

    return createResponse(res, 200, MESSAGES.LOCALITIES_FETCHED, {
      currentPage: Number(page),
      limit: Number(limit),
      totalPages,
      totalRecords,
      items,
    });

  } catch (error) {
    console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
    return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
  }
};
// --------------------------------------------------- conditional get location

// GET ALL COUNTRIES WITH FILTERS + PAGINATION
export const getAllCountries = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Base query
        const qb = MasterCountry.createQueryBuilder("country")
            .select([
                "country.id",
                "country.name",
                "country.code",
                "country.status",
                "country.createdAt",
                "country.updatedAt"
            ])
            .orderBy("country.id", "ASC")
            .limit(Number(limit))
            .offset(offset);

        // Dynamic filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                if (key === "status") {
                    qb.andWhere(`country."${key}" = :${key}`, { [key]: Number(value) });
                }
                else if (key === "id") {
                    qb.andWhere(`country."${key}" = :${key}`, { [key]: Number(value) });
                }
                else {
                    qb.andWhere(`country."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
                }
            }
        });

        const items = await qb.getMany();

        // Total count query
        const totalQB = MasterCountry.createQueryBuilder("country")
            .select("COUNT(country.id)", "total");

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                if (key === "status") {
                    totalQB.andWhere(`country."${key}" = :${key}`, { [key]: Number(value) });
                }
                else if (key === "id") {
                    totalQB.andWhere(`country."${key}" = :${key}`, { [key]: Number(value) });
                }
                else {
                    totalQB.andWhere(`country."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
                }
            }
        });

        const totalResult = await totalQB.getRawOne();
        const totalRecords = parseInt(totalResult.total || "0", 10);
        const totalPages = Math.ceil(totalRecords / Number(limit));

        return createResponse(res, 200, MESSAGES.COUNTRIES_FETCHED, {
            currentPage: Number(page),
            limit: Number(limit),
            totalPages,
            totalRecords,
            items,
        });

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};   
// GET ALL STATES WITH FILTERS + PAGINATION
export const getAllStates = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, countryId=1, ...filters } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Base query
        const qb = MasterState.createQueryBuilder("state")
            .select([
                "state.id",
                "state.name",
                "state.code",
                "state.countyId",
                "state.status",
                "state.createdAt",
                "state.updatedAt"
            ])
            .orderBy("state.id", "ASC")
            .limit(Number(limit))
            .offset(offset);

        // Filter by countryId if provided
        if (countryId) {
            qb.andWhere("state.countyId = :countryId", { countryId: Number(countryId) });
        }

        // Dynamic filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                if (key === "status" || key === "countyId" || key === "id") {
                    qb.andWhere(`state."${key}" = :${key}`, { [key]: Number(value) });
                } else {
                    qb.andWhere(`state."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
                }
            }
        });

        const items = await qb.getMany();

        // Total count query
        const totalQB = MasterState.createQueryBuilder("state")
            .select("COUNT(state.id)", "total");

        if (countryId) {
            totalQB.andWhere("state.countyId = :countryId", { countryId: Number(countryId) });
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                if (key === "status" || key === "countyId" || key === "id") {
                    totalQB.andWhere(`state."${key}" = :${key}`, { [key]: Number(value) });
                } else {
                    totalQB.andWhere(`state."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
                }
            }
        });

        const totalResult = await totalQB.getRawOne();
        const totalRecords = parseInt(totalResult.total || "0", 10);
        const totalPages = Math.ceil(totalRecords / Number(limit));

        return createResponse(res, 200, MESSAGES.STATES_FETCHED, {
            currentPage: Number(page),
            limit: Number(limit),
            totalPages,
            totalRecords,
            items,
        });

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};  
// GET ALL CITIES WITH FILTERS + PAGINATION
export const getAllCities = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 10, stateId = 1, ...filters } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Base query
        const qb = MasterCity.createQueryBuilder("city")
            .select([
                "city.id",
                "city.name",
                "city.code",
                "city.stateId",
                "city.status",
                "city.createdAt",
                "city.updatedAt"
            ])
            .orderBy("city.id", "ASC")
            .limit(Number(limit))
            .offset(offset);

        // Filter by stateId
        if (stateId) {
            qb.andWhere("city.stateId = :stateId", { stateId: Number(stateId) });
        }

        // Dynamic filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                if (key === "status" || key === "stateId" || key === "id") {
                    qb.andWhere(`city."${key}" = :${key}`, { [key]: Number(value) });
                } else {
                    qb.andWhere(`city."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
                }
            }
        });

        const items = await qb.getMany();

        // Total count query
        const totalQB = MasterCity.createQueryBuilder("city")
            .select("COUNT(city.id)", "total");

        if (stateId) {
            totalQB.andWhere("city.stateId = :stateId", { stateId: Number(stateId) });
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                if (key === "status" || key === "stateId" || key === "id") {
                    totalQB.andWhere(`city."${key}" = :${key}`, { [key]: Number(value) });
                } else {
                    totalQB.andWhere(`city."${key}" ILIKE :${key}`, { [key]: `%${value}%` });
                }
            }
        });

        const totalResult = await totalQB.getRawOne();
        const totalRecords = parseInt(totalResult.total || "0", 10);
        const totalPages = Math.ceil(totalRecords / Number(limit));

        return createResponse(res, 200, MESSAGES.CITIES_FETCHED, {
            currentPage: Number(page),
            limit: Number(limit),
            totalPages,
            totalRecords,
            items,
        });

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};  


