import { NextFunction, Request, Response, Router } from "express";
import { role } from "../constants/roles";
import AppDataSource from "../data-source";
import { Role } from "../entity/Role";
import { User } from "../entity/User";

export class FetchUserController {
	private _router: Router;

	constructor() {
		this._router = Router();
		this.setRoutes();
	}

	private setRoutes() {
		this.router.get("/user/:uid", (req: Request, res: Response) => {
			const { uid } = req.params;
			const userRepo = AppDataSource.getRepository(User);
			userRepo
				.createQueryBuilder("user")
				.where("user.id = :id", { id: uid })
				.getOne()
				.then((us) => {
					res.json({ msg: "User has found!!!", user: us });
				})
				.catch((err) => {
					res.json({ msg: "Not found User!!!", error: err });
				});
		});
	}

	public get router() {
		return this._router;
	}
}
