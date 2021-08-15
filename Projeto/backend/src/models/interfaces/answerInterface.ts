import { ObjectId, Types } from "mongoose";

interface IAnswer{
    user: ObjectId,
    subject: ObjectId,
    activity: ObjectId,
    start: string,
    totalGrade: number,
    questions: [
        {
            question: ObjectId,
            optionID: number,
            grade: number
        }
    ]
}

export default IAnswer;