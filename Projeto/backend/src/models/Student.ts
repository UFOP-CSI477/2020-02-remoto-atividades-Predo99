import { Schema, model } from 'mongoose';
import IStudent from './interfaces/studentInterface';

const studentSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subjects: [{
        subject: { type: Schema.Types.ObjectId, ref: 'Subject'},
        situation: { type: String, default: "Cursando" },
        start: { type: String, default: Date.now() },
        end: { type: String },
    }],
    favorites: [ Schema.Types.ObjectId ]
});

const studentModel = model<IStudent>('Student', studentSchema);

export default studentModel;