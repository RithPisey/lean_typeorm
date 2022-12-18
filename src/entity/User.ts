import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { base } from "./Base";
import { Course } from "./Course";
import { Role } from "./Role";

@Entity("user")
export class User extends base {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	age: number;

	@Column({
		type: "date",
	})
	dob: Date;

	@Column({
		type: "simple-json",
	})
	additional_info: {
		created_by: string;
		updated_by: string;
	};

	@ManyToOne(() => Role, { createForeignKeyConstraints: true })
	@JoinColumn()
	role: Role;

	@ManyToMany(() => Course, { eager: true })
	@JoinTable()
	courses: Course[];
}
