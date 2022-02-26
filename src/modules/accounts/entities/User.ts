import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn() // anotations
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  username: string;
  
  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  // cria o constructor para verificar seo ID está preenchido
  constructor() {
    if ( !this.id ) {
      this.id = uuidV4();
    }
  }
}

export { User }
