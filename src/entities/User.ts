import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as autoIncrement} from 'uuid'


@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = autoIncrement();
        }
    }
}

export { User }