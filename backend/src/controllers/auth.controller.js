import { findUserByEmail, createUser } from "../models/user.model.js";
import argon2 from "argon2";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import jwt from 'jsonwebtoken'



// inscription 


export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const avatar = req.file ? req.file.filename : null;

    const { error } = registerSchema.validate({ email, password, confirmPassword })

    if (error) {
      return res.status(400).json({
        message: "validation échouée",
        error: error.details[0].message,
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: `les mots de passe ne correspondent pas` });
    }

    const existsUser = await findUserByEmail(email);
    if (existsUser) {
      return res.status(409).json({ message: `cet email existe déjà` });
    }

    const hashedPassword = await argon2.hash(password);

    await createUser({ email, password: hashedPassword, avatar });
    res.status(201).json({ message: `utilisateur crée` });

  } catch (error) {
    console.error(error);
    console.error("Erreur sur l'enregistrement ", error.message)
    res.status(500).json({
      message: "Erreur du serveur",
      error: error.message
    });

  }
};


// login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({
        message: 'validation échouée',
        error: error.details[0].message
      });
    }

    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(401).json({ message: "email ou mot de passe invalide" })
    }

    const validPassword = await argon2.verify(user.password, password)

    if (!validPassword) {
      return res.status(401).json({ message: "email ou mot de passe invalide" })
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token })


  } catch (error) {
    console.error("erreur sur le login", error.message)
    res.status(500).json({
      message: "Erreur du serveur",
      error: error.message
    });

  }
}