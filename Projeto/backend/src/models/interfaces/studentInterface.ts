import { ObjectId, Types } from "mongoose";

interface IStudent{
    user: ObjectId,
    favorites: Types.Array<ObjectId>,
    subjects:  Types.Array<
        {
            subject: ObjectId,
            situation: string,
            start: string,
            end: string
        }
    >
}

export default IStudent;