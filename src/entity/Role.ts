import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { role } from "../constants/roles";
import { base } from "./Base";

@Entity("role")
export class Role extends base {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 10 })
	type: string;
}
