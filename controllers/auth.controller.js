const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../model/user');

exports.login = async (req, res) => {
    // res.send({ "answer": "Login 🙌 " });

    try {
        const { email, password } = req.body;

        if (!email && !password) {
            res.status(400).send("allinput required!");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User doesn't exist");
        }

        const userValid = bcrypt.compare(password, user.password);

        var token = jwt.sign(
            { id: user.id },
            'Token-key',
            { expiresIn: 86400 });

        user.token = token;

        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).send({ error: err });
    }
}

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email && !password) {
//             res.status(400).send("allinput required!");
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).send("User doesn't exist");
//         }

//         const userValid = bcrypt.compare(password, user.password);

//         if (user && userValid) {
//             const token = jwt.sign(
//                 { user_id: user.id, email },
//                 process.env.TOKEN_KEY,
//                 { expiresIn: '2h' }
//             );
//             user.token = token;
//             res.status(200).json(user);
//         }

//         res.status(400).send("Invalid Credentials");
//     }
//     catch (err) {
//         console.log(err);
//     }

// }

exports.register = async (req, res) => {
    try {
        const { fname, l_name, email, password } = req.body;

        if (!(email && password && fname && l_name)) {
            res.status(400).send("All inputs are required");
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fname,
            l_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        // const token = jwt.sign(
        //     { user_id: user.id, email },
        //     process.env.TOKEN_KEY,
        //     { expiresIn: '666h' }
        // );

        const token = jwt.sign(
            { id: user.id },
            'Token-key',
            { expiresIn: 86400 });

        await User.updateOne(
            { email: user.email },
            { token: token }
        );

        res.status(201).json({ ...user, token });
    }
    catch (err) {
        console.log(err);
    }
}

exports.getCurrentUser = async (req, res) => {
    const email = req.user.email;
    const user = await User.findOne({ email });

    res.status(200).send(user);
}