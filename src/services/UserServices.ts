import { EntityManager } from "typeorm";
import AppDataSource from "../data-source";
import { User } from "../entity/User";

export class userService {
	constructor() {}

	public async saveUser(user: User) {
		if (AppDataSource.isInitialized) {
			const sUser = AppDataSource.getRepository(User);
			return await sUser.insert(user);
		} else {
			return null;
		}
	}
}
