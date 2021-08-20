import { Schema, model } from 'mongoose';
import ISubject from './interfaces/subjectInterface';

const subjectSchema: Schema = new Schema({
    subjectName: { type: String, required: [true, 'Por favor digite um nome.'] },
    subjectDescription: { type: String, required: [true, 'Por favor digite uma descrição.'] },
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    slides: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: { type: Number, required: true, default: 0 }
});

const subjectModel = model<ISubject>('Subject', subjectSchema);

export default subjectModel;