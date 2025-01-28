import { type IUser } from "../user/user.dto";
import { User } from "../user/user.schema";
import { generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";
import Drawing from "./draw.schema";

/**
 * Saves a new drawing to the database.
 * @param {string} userId - The ID of the user saving the drawing.
 * @param {string} drawing - The drawing data as a base64 string.
 * @returns {Promise<string>} A promise that resolves with a success message when the drawing is saved.
 */
export const saveDraw = async (userId: string, drawing: string) => {    
    const newDrawing = new Drawing({ userId: userId, drawing });
    await newDrawing.save();

    return 'Drawing saved successfully';
};

export const updateDraw = async (id: string, data: IUser) => {
    const result = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const deleteDraw = async (id: string) => {
    const result = await User.deleteOne({ _id: id });
    return result;
};

/**
 * Retrieves a drawing by user ID.
 * @param {string} userId - The ID of the user associated with the drawing.
 * @returns {Promise<Document | null>} A promise that resolves with the drawing document if found, otherwise null.
 */
export const getDrawById = async (userId: string) => {
    const result = await Drawing.findOne({ userId }).lean();
    return result;
};