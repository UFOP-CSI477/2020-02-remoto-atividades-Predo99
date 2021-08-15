import { Response, Request } from "express";

import User from "../models/User";

const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await User.find();
    res.status(200).json(users);
};

const addUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body;
    
        const user = new User({
            name: body.name,
            email: body.email,
            password: body.password,
            userType: body.userType
        });
    
        const newUser = await user.save();
        return newUser;

        // res.status(201).send(newUser);
    } catch (error) {
        throw error
    }
}


const getUser = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).orFail();

        res.status(200).json(user);
    } catch(error) {
        res.status(400).json({"message": "Usuário não encontrado!"});
    }
};

export { getUsers, addUser, getUser };