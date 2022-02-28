import { getRepository, Repository } from "typeorm"

import { IUsersRepository } from "../IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { User } from "../../entities/User"
import { AppError } from "../../../../errors/AppError";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>   

  constructor() {
    this.repository = getRepository(User);
  }
  findById(id: string): Promise<User> {
    throw new AppError('Method not implemented.')
  }
  
  async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, 
      email,
      driver_license,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({email});
    return user
  }
}

export { UsersRepository }