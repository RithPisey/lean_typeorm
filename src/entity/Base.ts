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

export class base {
	@CreateDateColumn({ default: new Date() })
	created_at: Date;

	@UpdateDateColumn({ default: new Date() })
	updated_at: Date;
}
