import { NextFunction, Request, Response, Router } from "express";
import { DataSource } from "typeorm";
import { role } from "../constants/roles";
import AppDataSource from "../data-source";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { userService } from "../services/UserServices";

export class UserController {
	private _router: Router;
	private userService: userService;
	private user: User;

	constructor() {
		this._router = Router();
		this.user = new User();
		this.userService = new userService();
		this.setRoutes();
	}

	private setRoutes() {
		this.router.post("/createUser", this.createUserAdmin(role.USER));
		this.router.post("/createAdmin", this.createUserAdmin(role.ADMIN));
	}

	private createUserAdmin(duty: string) {
		return (req: Request, res: Response) => {
			//....
			this.user.firstName = req.body.firstName;
			this.user.lastName = req.body.lastName;
			this.user.age = req.body.age;
			this.user.dob = new Date();
			this.user.additional_info = {
				created_by: "",
				updated_by: "",
			};

			const roleRepository = AppDataSource.getRepository(Role);
			roleRepository
				.findOneBy({
					type: duty === role.USER ? role.USER : role.ADMIN,
				})
				.then((val) => {
					this.user.role = val;
					const rs = this.userService.saveUser(this.user);
					rs.then((val) => {
						if (val) {
							return res.json({ msg: "success save user!!!", user: val });
						}
					}).catch((err) => {
						return res.json({ msg: "error occur!!!", err: err });
					});
				});
		};
	}

	public get router() {
		return this._router;
	}
}
