import { Schema, model } from 'mongoose';
import ITeacher from './interfaces/teacherInterface';

const teacherSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: [true, 'Por favor digite uma descrição.'] },
});

const teacherModel = model<ITeacher>('Teacher', teacherSchema);

export default teacherModel;