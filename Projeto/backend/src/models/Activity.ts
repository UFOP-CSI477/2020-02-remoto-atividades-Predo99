import { Schema, model } from 'mongoose';
import IActivity from './interfaces/activityInterface';

const activitySchema: Schema = new Schema({
    name: { type: String, required: [true, 'Por favor digite um nome.'] },
    description: { type: String, required: [true, 'Por favor digite uma descrição.'] },
    type: { type: String, required: true, default:"questionnaire"},
    questions: [
        {
            description: { type: String, required: [true, 'Por favor digite uma descrição.'] },
            options: [
                {
                    id: { type: Number , required: true },
                    value: { type: String, required: [true, 'Por favor digite a opção.'] },
                }
            ],
            answer: { type: Number, required: [true, 'Por favor selecione uma resposta.'] },
            value: { type: Number, required: [true, 'Por favor digite um valor.'] },
        }
    ],
    totalValue: { type: Number, required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
}, { collection: 'activities' });

const activityModel = model<IActivity>('Activity', activitySchema);

export default activityModel;