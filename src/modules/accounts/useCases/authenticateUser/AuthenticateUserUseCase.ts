import { compare } from "bcrypt"
import { inject } from 'tsyringe';
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
}

class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, "a5c100b933d115c8c73642d517162030", {
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user,
      token,
    }
  }
}

export { AuthenticateUserUseCase }