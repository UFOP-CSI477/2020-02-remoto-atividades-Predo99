import { Response, Request } from "express";
import Student from "../models/Student";
import Subject from "../models/Subject";
import User from "../models/User";
import { addUser, updateUser } from "./userController";

const getStudents = async (req: Request, res: Response): Promise<void> => {
    const students = await Student.find().populate({ path: "user" });

    res.status(200).json({ students });
};

const addStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await addUser(req, res);
        
        const student = new Student({
            user: user._id,
            subjects: [],
            favorites: []
        });

        await student.save();

        res.status(201).json({"message": "Aluno cadastrado com sucesso!"});

    } catch (error) {
        res.status(400).json(error);
    }
};

const updateStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await updateUser(req, res);

        res.status(201).json({"message": "Aluno atualizado com sucesso!"});

    } catch (error) {
        res.status(400).json(error);
    }
};

const showStudent = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).orFail();
        const student = await Student.findOne({ user: user._id }).orFail();

        res.status(200).json(student);
    } catch(error) {
        res.status(400).json({"message": "Aluno não encontrado!"});
    }
};

const enrollToSubject = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        const subject = await Subject.findByIdAndUpdate(id, { $inc: { students: 1}  });
        await Student.findOneAndUpdate({ user: req.userId}, { $push : {
            subjects: {
                "subject": subject,
                "situation": "Cursando",
                "start": Date.now(),
                "end": "",
            }
        }});

        res.status(201).json({"message": "Matriculado com sucesso!"});
    } catch(error) {
        res.status(400).json(error);
    }
};

export { getStudents, addStudent, enrollToSubject, showStudent, updateStudent };