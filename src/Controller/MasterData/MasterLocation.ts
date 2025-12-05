import { MasterCity } from "../../Entities/masterCity";
import { MasterCountry } from "../../Entities/masterCountry";
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

// GET ALL COUNTRIES
export const getAllCountries = async (_req: any, res: any) => {
    try {
        const list = await MasterCountry.find();
        return createResponse(res, 200, MESSAGES.COUNTRIES_FETCHED, list);
    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

// GET COUNTRY BY ID
export const getCountryById = async (req: any, res: any) => {
    try {
        const country = await MasterCountry.findOne({ where: { id: Number(req.params.id) } });

        if (!country) {
            return createResponse(res, 404, MESSAGES.COUNTRY_NOT_FOUND, []);
        }

        return createResponse(res, 200, MESSAGES.COUNTRY_FETCHED, country);
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

// GET ALL STATES
// export const getAllStates = async (req: any, res: any) => {
//     try {
//         const {countryId=1 }= req.query  
//         const states = await MasterState.createQueryBuilder("state")
//             .select([
//                 "state.id AS id",
//                 "state.name AS name",
//                 "state.code AS code",
//                 "state.status AS status",
//                 "state.countyId AS countryId",
//                 "country.name AS countryName",
//                 "country.code AS countryCode",
//             ])
//             .leftJoin(MasterCountry, "country", "state.countyId = country.id")
//             .where("state.countyId = :countryId", { countryId })
//             .getRawMany();

//         return createResponse(res, 200, MESSAGES.STATES_FETCHED, states);
//     } catch (error) {
//         console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
//         return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
//     }
// };
// GET ALL STATES (FIND METHOD)
export const getAllStates = async (req: any, res: any) => {
    try {
        const { countryId = 1 } = req.query;

        const states = await MasterState.find({
            where: { countyId: Number(countryId) }
        });

        return createResponse(res, 200, MESSAGES.STATES_FETCHED, states);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
}; 
// GET STATE BY ID (FIND METHOD)
export const getStateById = async (req: any, res: any) => {
    try {
        const state = await MasterState.findOne({
            where: { id: Number(req.params.id) }
        });

        if (!state)
            return createResponse(res, 404, MESSAGES.STATE_NOT_FOUND, []);

        return createResponse(res, 200, MESSAGES.STATE_FETCHED, state);

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

export const getAllCities = async (req: any, res: any) => {
    try {
        const { stateId = 1 } = req.query;

        const cities = await MasterCity.find({
            where: { stateId: Number(stateId) }
        });

        return createResponse(res, 200, MESSAGES.CITIES_FETCHED, cities);

    } catch (error) {
        console.log(MESSAGES.INTERNAL_SERVER_ERROR, error);
        return createResponse(res, 500, MESSAGES.INTERNAL_SERVER_ERROR, [], true, true);
    }
};

export const getCityById = async (req: any, res: any) => {
    try {
        const city = await MasterCity.findOne({
            where: { id: Number(req.params.id) }
        });

        if (!city)
            return createResponse(res, 404, MESSAGES.CITY_NOT_FOUND, []);

        return createResponse(res, 200, MESSAGES.CITY_FETCHED, city);

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
