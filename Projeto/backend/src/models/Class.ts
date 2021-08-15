import { Schema, model } from 'mongoose';
import IClass from './interfaces/classInterface';

const classSchema: Schema = new Schema({
    name: { type: String, required: [true, 'Por favor digite um nome.'] },
    path: { type: String, required: [true, 'Por favor digite um link.'] },
});

const classModel = model<IClass>('Class', classSchema);

export default classModel;