import { Schema, model } from 'mongoose';
import ISubject from './interfaces/subjectInterface';

const subjectSchema: Schema = new Schema({
    subjectName: { type: String, required: [true, 'Por favor digite um nome.'] },
    subjectDescription: { type: String, required: [true, 'Por favor digite uma descrição.'] },
    // classes: [{
    //     name: { type: String, required: [true, 'Por favor digite um nome.'] },
    //     path: { type: String, required: [true, 'Por favor digite um link.'] },
    // }],
    // slides: [{
    //     name: { type: String, required: [true, 'Por favor digite um nome.'] },
    //     path: { type: String, required: [true, 'Por favor selecione um arquivo.'] },
    // }],
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    slides: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: { type: Number, required: true, default: 0 }
});

const subjectModel = model<ISubject>('Subject', subjectSchema);

export default subjectModel;