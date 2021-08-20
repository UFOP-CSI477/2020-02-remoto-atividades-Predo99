import { Response, Request } from "express";
import Subject from "../models/Subject";
import Teacher from "../models/Teacher";
import User from "../models/User";
import { addSubject, updateSubject } from "./subjectController";
import { addUser, updateUser } from "./userController";

declare module 'express' {
    interface Request {
        userId?: any
    }
}

const getTeachers = async (req: Request, res: Response): Promise<void> => {
    const teachers = await Teacher.find().populate("user");

    res.status(200).json({ teachers });
};

const addTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await addUser(req, res);
        
        const teacher = new Teacher({
            user: user._id,
            description: req.body.description
        });

        const newTeacher = await teacher.save();

        await addSubject(req, res, newTeacher._id);

        res.status(201).json({"message": "Professor cadastrado com sucesso!"});

    } catch (error) {
        res.status(400).json(error);
    }
}

const updateTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await updateUser(req, res);

        const teacher = await Teacher.findOneAndUpdate({user: user._id}, {
            description: req.body.description
        }).orFail();

        await updateSubject(req, res, teacher._id);

        res.status(201).json({"message": "Professor atualizado com sucesso!"});

    } catch (error) {
        res.status(400).json(error);
    }
};

const showTeacher = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).orFail();
        const teacher = await Teacher.findOne({ user: user._id }).orFail();

        res.status(200).json(teacher);
    } catch(error) {
        res.status(400).json({"message": "Professor não encontrado!"});
    }
};

const showTeacherSubject = async (req: Request, res: Response): Promise<any> => {
    try {
        const teacher = await Teacher.findOne({ user: req.userId }).orFail();
        const subject = await Subject.findOne({ teacher: teacher._id }).orFail();

        res.status(200).json(subject);
    } catch(error) {
        res.status(400).json({"message": "Matéria não encontrada!"});
    }
};

export { getTeachers, addTeacher, showTeacher, showTeacherSubject, updateTeacher };