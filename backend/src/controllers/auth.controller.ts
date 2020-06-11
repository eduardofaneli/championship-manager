import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from '../database/connection';
import Profile from '../models/profile.model';

const authConfig = require("../config/auth.json");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 })
}

class AuthController {

  async register(request: Request, response: Response) {
    try {
      const {
        name,
        email,
        password,
        whatsapp,
      } = request.body;

      if (await knex('profile').select('email').where('email', email).first())
        return response.status(400).send({ error: 'User already exists' })

      let id = 0;

      const user: Profile = {
        id,
        name,
        email,
        password,
        whatsapp
      }

      user.id = await knex('profile').insert(request.body);
      user.password = '';

      const token = generateToken({ id: user.id })

      return response.json({ user, token })

    }
    catch (error) {
      console.error(error);
      return response.status(400).send({ error: 'Registration failed' });
    }
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await knex('profile')
      .select(
        'id',
        'name',
        'email',
        'password',
        'whatsapp',
      )
      .where('email', email)
      .first()
    if (!user)
      return response.status(400).send({ error: "User not found" })

    if (!await bcrypt.compare(password, user.password)) {
      return response.status(400).send({ error: 'Invalid password' })
    }

    user.password = undefined

    const token = generateToken({ id: user.id })


    return response.send({ user, "token": "" });
  }

}

export default AuthController;