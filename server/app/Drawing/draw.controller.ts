import * as drawService from "./draw.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'
import createHttpError from "http-errors";

/**
 * Saves a new drawing.
 * @param {Request} req - The request object containing the drawing data in the body.
 * @param {Response} res - The response object to send the result of the creation.
 * @throws {Error} If the user is not authorized.
 * @returns {Promise<void>} - A promise that resolves when the drawing is created and response is sent.
 */
export const saveDraw = asyncHandler(async (req: Request, res: Response) => {
    const { drawing, textItems } = req.body;    

    if(!req.user){
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }
    const result = await drawService.saveDraw(req.user._id as string, drawing, textItems);
    res.send(createResponse(result, "Draw created sucssefully"))
});

export const updateDraw = asyncHandler(async (req: Request, res: Response) => {
    const result = await drawService.updateDraw(req.params.id, req.body);
    res.send(createResponse(result, "Draw updated sucssefully"))
});

export const deleteDraw = asyncHandler(async (req: Request, res: Response) => {
    const result = await drawService.deleteDraw(req.params.id);
    res.send(createResponse(result, "Draw deleted sucssefully"))
});

/**
 * Retrieves a drawing by ID.
 * @param {Request} req - The request object containing the drawing ID in the params.
 * @param {Response} res - The response object to send the result of the retrieval.
 * @returns {Promise<void>} - A promise that resolves when the drawing is retrieved and response is sent.
 */
export const getDrawById = asyncHandler(async (req: Request, res: Response) => {
    const result = await drawService.getDrawById(req.params.id);
    res.send(createResponse(result))
});
