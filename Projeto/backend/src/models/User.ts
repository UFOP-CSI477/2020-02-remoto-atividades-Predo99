import { Schema, model } from 'mongoose';
import IUser from './interfaces/userInterface';

const userSchema: Schema = new Schema({
    name: { type: String, required: [true, 'Por favor digite um nome.'] },
    email: { type: String, required: [true, 'Por favor digite um email.'] },
    password: { type: String, required: [true, 'Por favor digite uma senha.'], select: false },
    userType: { type: String, required: true }
});

const userModel = model<IUser>('User', userSchema);

export default userModel;