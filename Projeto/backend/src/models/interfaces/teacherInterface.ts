import { ObjectId, Types } from "mongoose";

interface ITeacher{
    user: ObjectId,
    description: string,
}

export default ITeacher;