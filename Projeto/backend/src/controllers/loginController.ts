import { Response, Request } from "express";
import User from "../models/User";
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response): Promise<void> => {

    const user = await User.findOne({email: req.body.email, password: req.body.password}).exec();

    if(user != null){
        const id = user._id;
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 86400
        });

        res.cookie('x-access-token', token);
        res.status(201).send({ auth: true, token: token, userId: id, userType: user.userType });

    } else {
        res.status(400).send({'message': 'Email e/ou senha incorretos!'});
    }
};

const logout = async (req: Request, res: Response): Promise<void> => {
    res.cookie('x-access-token', null);
    res.status(200).send({ auth: false, token: null });
};

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];

    if(!token){
        var rawCookies = req.headers.cookie;
        
        if(rawCookies){
            rawCookies = rawCookies.split('; ');
            const parsedCookies = {};
            rawCookies.forEach(rawCookie=>{
                const parsedCookie = rawCookie.split('=');
                parsedCookies[parsedCookie[0]] = parsedCookie[1];
            });

            token = parsedCookies['x-access-token'];
        }
    }

    if (!token) {
        return res.status(401).json({ auth: false, message: 'Usuário não autenticado.'});
    }
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            return res.status(401).json({ auth: false, message: 'Falha de autenticação.'});
        }
      
      req.userId = decoded.id;
      next();
    });
}

export { login, logout, verifyJWT };