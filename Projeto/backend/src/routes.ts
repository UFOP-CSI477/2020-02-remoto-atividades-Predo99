import { Router } from "express";

import multer from 'multer';
import uploadConfig from './config/upload';

import { getUsers, addUser, getUser } from "./controllers/userController";
import { getStudents, addStudent, showStudent, enrollToSubject, updateStudent } from "./controllers/studentController";
import { addTeacher, getTeachers, showTeacher, showTeacherSubject, updateTeacher } from "./controllers/teacherController";
import { login, logout, verifyJWT } from "./controllers/loginController";
import { addClass, addSlide, addSubject, editClass, editSlide, getSubjects, removeClass, removeSlide, returnSlide, showClass, showSlide, showSubject } from "./controllers/subjectController";
import { addActivity, addAnswer, editActivity, removeActivity, showActivity, showAnswer, showAnswers } from "./controllers/activityController";

// https://stackoverflow.com/questions/54545581/how-can-i-return-multer-error-to-client-while-using-express-validator
function multerUploadMiddleware(multerUploadFunction) {
    return (req, res, next) =>
        multerUploadFunction(req, res, err => {
            if (err && err.name && err.name === 'MulterError') {
                return res.status(500).send({
                    error: err.name,
                    message: `Erro no upload do arquivo: ${err.message}`,
                });
            }
            if (err) {
                return res.status(500).send({
                    error: 'FILE UPLOAD ERROR',
                    message: `Aconteceu algum problema durante o salvamento do arquivo`,
                });
            }

            next();
        });
}

const router: Router = Router();
const upload = multer(uploadConfig);

const multerMiddleware = multerUploadMiddleware(upload.single('slide'));

router.get("/users", getUsers);
router.post("/addUser", addUser);
router.get("/getUser", verifyJWT, getUser);

router.post("/login", login);
router.post("/logout", logout);

router.get("/students", verifyJWT, getStudents);
router.post("/addStudent", addStudent);
router.get("/student/:id", verifyJWT, showStudent);
router.patch("/student/:id", verifyJWT, updateStudent);
router.get("/enroll/:id", verifyJWT, enrollToSubject);

router.get("/teachers", verifyJWT, getTeachers);
router.post("/addTeacher", addTeacher);
router.get("/teacher/:id", verifyJWT, showTeacher);
router.patch("/teacher/:id", verifyJWT, updateTeacher);
router.get("/teacherSubject", verifyJWT, showTeacherSubject);

router.get("/subjects", getSubjects);
router.post("/addSubject", addSubject);
router.get("/subject/:id", verifyJWT, showSubject);
router.post("/addClass/:id", verifyJWT, addClass);
router.delete("/removeClass/:id/:class", verifyJWT, removeClass);
router.get("/class/:id/:class", verifyJWT, showClass);
router.patch("/editClass/:id/:class", verifyJWT, editClass);
router.post("/addSlide/:id", verifyJWT, multerMiddleware, addSlide);
router.delete("/removeSlide/:id/:slide", verifyJWT, removeSlide);
router.get("/returnSlide/:path", verifyJWT, returnSlide);
router.get("/slide/:id/:slide", verifyJWT, showSlide);
router.patch("/editSlide/:id/:slide", verifyJWT, multerMiddleware, editSlide);

router.post("/addActivity/:id", verifyJWT, addActivity);
router.delete("/removeActivity/:id/:activity", verifyJWT, removeActivity);
router.get("/showActivity/:id/:activity", verifyJWT, showActivity);
router.patch("/editActivity/:id/:activity", verifyJWT, editActivity);
router.post("/addAnswer/:id/:activity", verifyJWT, addAnswer);
router.get("/showAnswers/:id", verifyJWT, showAnswers);
router.get("/showAnswer/:id", verifyJWT, showAnswer);

export default router;