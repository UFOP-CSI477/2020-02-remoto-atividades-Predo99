import { Schema, model } from 'mongoose';
import IAnswer from './interfaces/answerInterface';

const answerSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
    start: { type: String },
    totalGrade: { type: Number, required: true },
    questions: [
        {
            question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
            optionID: { type: Number, required: [true, 'Por favor selecione uma opção.'] },
            grade: { type: Number, required: true },
        }
    ]
});

const answerModel = model<IAnswer>('Answer', answerSchema);

export default answerModel;