import { ObjectId } from "mongoose";

interface ITeacher{
    user: ObjectId,
    description: string,
}

export default ITeacher;