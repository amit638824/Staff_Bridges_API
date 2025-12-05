import { MasterCountry } from "../../Entities/masterCountry";
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
