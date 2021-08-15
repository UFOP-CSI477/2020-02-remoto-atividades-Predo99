import { ObjectId, Types } from "mongoose";
import IActivity from "./activityInterface";

interface ISubject{
    name: string,
    description: string,
    classes: [
        {
            name: string,
            path: string,
        }
    ],
    slides: [
        {
            name: string,
            path: string,
        }
    ],
    activities: [
        ObjectId
    ],
    teacher: ObjectId,
    students: Number,
}

export default ISubject;