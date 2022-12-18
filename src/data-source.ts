import "reflect-metadata";
import { DataSource } from "typeorm";
import { Course } from "./entity/Course";
import { Role } from "./entity/Role";
import { User } from "./entity/User";

const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "123",
	database: "learn_typeorm",
	synchronize: true,
	logging: false,
	entities: [User, Role, Course],
	migrations: ["./build/migration/*.js"],
	subscribers: [],
});
export default AppDataSource;

//suggestion:
// - create .env file for store all database credentials
