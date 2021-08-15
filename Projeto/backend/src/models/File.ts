import { Schema, model } from 'mongoose';
import IFile from './interfaces/fileInterface';

const fileSchema: Schema = new Schema({
    name: { type: String, required: [true, 'Por favor digite um nome.'] },
    path: { type: String, required: [true, 'Por favor selecione um arquivo.'] },
});

const fileModel = model<IFile>('File', fileSchema);

export default fileModel;