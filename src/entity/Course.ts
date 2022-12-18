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
} from "typeorm";
import { base } from "./Base";

@Entity("course")
export class Course extends base {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	course: string;

	@Column()
	duration: string;
}
