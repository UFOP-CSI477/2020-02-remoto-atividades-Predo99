import { Response, Request } from "express";
import fs from 'fs';
import path from 'path';
import Activity from "../models/Activity";
import Answer from "../models/Answer";
import classModel from "../models/Class";
import fileModel from "../models/File";
import Student from "../models/Student";
import Subject from "../models/Subject";
import Teacher from "../models/Teacher";
import User from "../models/User";

const getSubjects = async (req: Request, res: Response): Promise<void> => {
    const subjects = await Subject.find().populate({ path: "teacher", populate: {
        path: "user"
    }});

    res.status(200).json(subjects);
};

const addSubject = async (req: Request, res: Response, teacherId: any): Promise<any> => {
    try {

        const body = req.body;

        const teacher = await Teacher.findById(teacherId).orFail();


        const subject = new Subject({
            subjectName: body.subjectName,
            subjectDescription: body.subjectDescription,
            classes: [],
            slides: [],
            activities: [],
            teacher: teacher._id
        });
    
        const newSubject = await subject.save();
        return newSubject;

    } catch (error) {
        throw error
    }
}

const showSubject = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {

        const user = await User.findById(req.userId).orFail();
        const subject = await Subject.findById(id).orFail()
                                .populate("teacher")
                                .populate("classes")
                                .populate("slides")
                                .populate("activities", "name answers");

        if(user.userType == "student"){
            await checkSituation(user._id, subject._id);
        }

        res.status(200).json(subject);
    } catch(error) {
        res.status(400).json({"message": "Matéria não encontrada!"});
    }
}

const addClass = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {

        const subjectClass = new classModel({
            name: req.body.name,
            path: req.body.path
        });

        const newSubjectClass = await subjectClass.save();

        await Subject.findByIdAndUpdate(id, { $push : {
            classes: newSubjectClass._id
        }});

        res.status(201).json({"message": "Aula cadastrada com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
}

const removeClass = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const classId = req.params.class;
    try {
        await Subject.findByIdAndUpdate(id, { $pull: { 
            classes: classId
        }}).orFail();

        await classModel.findByIdAndDelete(classId).orFail();

        res.status(200).json({"message": "Aula excluída com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
}

const showClass = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const classId = req.params.class;
    try {

        const classe = await classModel.findById(classId).orFail();

        res.status(200).json(classe);
    } catch(error) {
        res.status(400).json({"message": "Aula não encontrada!"});
    }
}

const editClass = async (req: Request, res: Response): Promise<any> => {
    const classId = req.params.class;
    try {

        await classModel.findByIdAndUpdate(classId, {
            name: req.body.name,
            path: req.body.path
        }).orFail();

        res.status(200).json({"message": "Aula editada com sucesso!!"});
    } catch(error) {
        res.status(400).json({"message": "Aula não encontrada!"});
    }
}

const addSlide = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {

        var filepath;

        if(req.file){
            filepath = req.file.filename;
        }

        const file = new fileModel({
            name: req.body.name,
            path: filepath
        });

        const newFile = await file.save();

        await Subject.findByIdAndUpdate(id, { $push : {
            slides: newFile._id
        }});

        res.status(201).json({"message": "Slide cadastrado com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
}

const removeSlide = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const slideId = req.params.slide;
    try {
        const deleted = await fileModel.findById(slideId);
        const oldFile = deleted.path;
        const filepath = path.join(__dirname, '..', '..', 'uploads/', oldFile);

        await Subject.findByIdAndUpdate(id, { $pull: { 
            slides: slideId
        }}).orFail();

        await fileModel.findByIdAndDelete(slideId).orFail();

        fs.unlinkSync(filepath);

        res.status(200).json({"message": "Slide excluído com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
}

const returnSlide = async (req: Request, res: Response): Promise<any> => {
    try {
        const filepath = path.join(__dirname, '..', '..', 'uploads/', req.params.path);
        res.download(filepath);

        // fs.readFile(filepath, function (err,data){
        //     res.contentType("application/pdf");
        //     res.send(data);
        // });

    } catch(error) {
        res.status(400).json(error);
    }
}

const showSlide = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const slideId = req.params.slide;
    try {

        const slide = await fileModel.findById(slideId).orFail();

        res.status(200).json(slide);
    } catch(error) {
        res.status(400).json({"message": "Slide não encontrado!"});
    }
}

const editSlide = async (req: Request, res: Response): Promise<any> => {
    const slideId = req.params.slide;
    try {

        const slide = await fileModel.findById(slideId).orFail();
        const oldFile = slide.path;
        const oldFilepath = path.join(__dirname, '..', '..', 'uploads/', oldFile);

        if(req.file){
            await fileModel.findByIdAndUpdate(slideId, {
                name: req.body.name,
                path: req.file.filename
            }).orFail();

            fs.unlinkSync(oldFilepath);
        } else {
            await fileModel.findByIdAndUpdate(slideId, {
                name: req.body.name,
            }).orFail();
        }        

        res.status(200).json({"message": "Slide editado com sucesso!!"});
    } catch(error) {
        res.status(400).json({"message": "Aula não encontrada!"});
    }
}

async function checkSituation(user_id: any, subject_id: any){

    const student = await Student.findOne({user: user_id}).orFail();
    const subject = await Subject.findById(subject_id).orFail().populate("activities", "totalValue");

    // const answers = await Answer.find({user: user_id, subject: subject_id}).sort('-totalGrade').distinct("activity");
    //const answers = await Answer.find({user: user_id, subject: subject_id}).sort('-totalGrade');

    const answers = await Answer.aggregate([
        { $match: {
            'user': user_id,
            'subject': subject_id
        }},
        { $sort: {
            'totalGrade': -1,
            '_id': 1
        }},
        { $group: {
            _id: '$activity',
            "totalGrade": {$first: '$totalGrade'}
        }}
    ]);

    if(answers.length >= subject.activities.length){
        var totalValue = 0;
        var totalAnswersValue = 0;

        for (const activity of subject.activities) {
            if (activity instanceof Activity){
                totalValue += activity.totalValue;
            }
        }

        for (const answer of answers) {
            totalAnswersValue += answer.totalGrade;
        }

        if(totalAnswersValue >= totalValue * 0.6){
            await Student.findOneAndUpdate(
                {user: user_id, subjects: {$elemMatch: {subject: subject_id}}}, 
                {$set: {'subjects.$.situation': "Aprovado"}}
            );

            return "Aprovado";
        } else {
            await Student.findOneAndUpdate(
                {user: user_id, subjects: {$elemMatch: {subject: subject_id}}}, 
                {$set: {'subjects.$.situation': "Reprovado", 'subjects.$.end': Date.now()}}
            );

            return "Reprovado";
        }
    }

    return "Cursando";
}


export { getSubjects, addSubject, showSubject, addClass, removeClass, showClass, editClass, addSlide, removeSlide, returnSlide, showSlide, editSlide, checkSituation };