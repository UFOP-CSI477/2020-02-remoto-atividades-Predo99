import { Response, Request } from "express";
import Activity from "../models/Activity";
import Answer from "../models/Answer";

import Subject from "../models/Subject";
import { checkSituation } from "./subjectController";

const addActivity = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {

        const activity = new Activity({
            name: req.body.name,
            description: req.body.description,
            questions: [
                {
                    description: req.body.question0_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question0_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question0_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question0_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question0_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question0_option4,
                        }
                    ],
                    answer: req.body.question0_answer,
                    value: req.body.question0_value,
                },
                {
                    description: req.body.question1_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question1_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question1_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question1_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question1_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question1_option4,
                        }
                    ],
                    answer: req.body.question1_answer,
                    value: req.body.question1_value,
                },
                {
                    description: req.body.question2_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question2_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question2_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question2_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question2_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question2_option4,
                        }
                    ],
                    answer: req.body.question2_answer,
                    value: req.body.question2_value,
                },
                {
                    description: req.body.question3_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question3_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question3_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question3_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question3_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question3_option4,
                        }
                    ],
                    answer: req.body.question3_answer,
                    value: req.body.question3_value,
                },
                {
                    description: req.body.question4_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question4_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question4_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question4_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question4_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question4_option4,
                        }
                    ],
                    answer: req.body.question4_answer,
                    value: req.body.question4_value,
                }
            ],
            totalValue: Number(req.body.question0_value) + Number(req.body.question1_value) + Number(req.body.question2_value) + 
                        Number(req.body.question3_value) + Number(req.body.question4_value),
        });

        const newActivity = await activity.save();

        await Subject.findByIdAndUpdate(id, { $push : {
            activities: newActivity._id
        }});

        res.status(201).json({"message": "Atividade cadastrada com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
}

const showActivity = async (req: Request, res: Response): Promise<any> => {
    const activity_id = req.params.activity;
    try {
        const activity = await Activity.findById(activity_id).orFail();
        res.status(200).json(activity);
    } catch(error) {
        res.status(400).json({"message": "Atividade não encontrada!"});
    }
}

const addAnswer = async (req: Request, res: Response): Promise<any> => {
    const user_id = req.userId;
    const subject_id = req.params.id;
    const activity_id = req.params.activity;

    try {
        const activity = await Activity.findById(activity_id).orFail();

        var question_grades = [];
        var question_answers = [
            req.body.question0_answer,
            req.body.question1_answer,
            req.body.question2_answer,
            req.body.question3_answer,
            req.body.question4_answer
        ];

        activity.questions.forEach((question, index) => {
            if(question.answer == question_answers[index]){
                question_grades.push(question.value);
            } else {
                question_grades.push(0);
            }
        });

        const answer = new Answer({
            user: user_id,
            subject: subject_id,
            activity: activity_id,
            questions: [
                {
                    question: req.body.question0_id,
                    optionID: req.body.question0_answer,
                    grade: question_grades[0],
                },
                {
                    question: req.body.question1_id,
                    optionID: req.body.question1_answer,
                    grade: question_grades[1],
                },
                {
                    question: req.body.question2_id,
                    optionID: req.body.question2_answer,
                    grade: question_grades[2],
                },
                {
                    question: req.body.question3_id,
                    optionID: req.body.question3_answer,
                    grade: question_grades[3],
                },
                {
                    question: req.body.question4_id,
                    optionID: req.body.question4_answer,
                    grade: question_grades[4],
                },
            ],
            totalGrade: question_grades.reduce((a, b) => a + b, 0),
        });

        const newAnswer = await answer.save();
        await Activity.findByIdAndUpdate(activity_id, { $push : {
            answers: newAnswer._id,
        }});

        await checkSituation(user_id, subject_id);

        res.status(201).json({"message": "Resposta cadastrada com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
}

const removeActivity = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const activityId = req.params.activity;
    try {
        const activity = await Activity.findById(activityId).orFail();
        
        await Answer.deleteMany({activity: activity._id});

        await Subject.findByIdAndUpdate(id, { $pull: { 
            activities: activity._id
        }}).orFail();

        await Activity.findByIdAndDelete(activityId).orFail();

        res.status(200).json({"message": "Atividade excluída com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
}

const showAnswers = async (req: Request, res: Response): Promise<any> => {
    const user_id = req.userId;
    const subject_id = req.params.id;

    try {
        const subject = await Subject.findById(subject_id).orFail();

        const answers = await Answer.find({user: user_id, subject: subject._id});
        res.status(200).json(answers);
    } catch(error) {
        res.status(400).json({"message": "Respostas não encontradas!"});
    }
}

const showAnswer = async (req: Request, res: Response): Promise<any> => {
    const answer_id = req.params.id;
    try {
        const answer = await Answer.findById(answer_id).orFail();
        res.status(200).json(answer);
    } catch(error) {
        res.status(400).json({"message": "Resposta não encontrada!"});
    }
}

const editActivity = async (req: Request, res: Response): Promise<any> => {
    const activity_id = req.params.activity;
    try {
        const activity = await Activity.findByIdAndUpdate(activity_id, {
            name: req.body.name,
            description: req.body.description,
            questions: [
                {
                    description: req.body.question0_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question0_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question0_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question0_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question0_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question0_option4,
                        }
                    ],
                    answer: req.body.question0_answer,
                    value: req.body.question0_value,
                },
                {
                    description: req.body.question1_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question1_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question1_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question1_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question1_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question1_option4,
                        }
                    ],
                    answer: req.body.question1_answer,
                    value: req.body.question1_value,
                },
                {
                    description: req.body.question2_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question2_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question2_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question2_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question2_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question2_option4,
                        }
                    ],
                    answer: req.body.question2_answer,
                    value: req.body.question2_value,
                },
                {
                    description: req.body.question3_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question3_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question3_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question3_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question3_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question3_option4,
                        }
                    ],
                    answer: req.body.question3_answer,
                    value: req.body.question3_value,
                },
                {
                    description: req.body.question4_description,
                    options: [
                        {
                            id: 0,
                            value: req.body.question4_option0,
                        },
                        {
                            id: 1,
                            value: req.body.question4_option1,
                        },
                        {
                            id: 2,
                            value: req.body.question4_option2,
                        },
                        {
                            id: 3,
                            value: req.body.question4_option3,
                        },
                        {
                            id: 4,
                            value: req.body.question4_option4,
                        }
                    ],
                    answer: req.body.question4_answer,
                    value: req.body.question4_value,
                }
            ],
            totalValue: Number(req.body.question0_value) + Number(req.body.question1_value) + Number(req.body.question2_value) + 
                        Number(req.body.question3_value) + Number(req.body.question4_value),
        }).orFail();

        const answers = await Answer.find({activity: activity._id}).exec();

        for (const answer of answers) {
            let total = 0;
            let index = 0;
            for (const question of answer.questions) {
                if(question.optionID == activity.questions[index].answer){
                    await Answer.findOneAndUpdate({_id: answer._id, questions: {$elemMatch: {question: question.question}}}, {$set: {
                        "questions.$.grade": activity.questions[index].value
                    }});
                    total += activity.questions[index].value;
                } else {
                    await Answer.findOneAndUpdate({_id: answer._id, questions: {$elemMatch: {question: question.question}}}, {$set: {
                        "questions.$.grade": 0
                    }});
                }
                index++;
            }
            await Answer.findByIdAndUpdate(answer._id, {totalGrade: total}).orFail();
        }

        res.status(201).json({"message": "Atividade editada com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
}

export { addActivity, showActivity, addAnswer, removeActivity, editActivity, showAnswers, showAnswer };