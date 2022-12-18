import { NextFunction, Request, Response, Router } from "express";
import { DataSource } from "typeorm";
import { role } from "../constants/roles";
import AppDataSource from "../data-source";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { Course } from "../entity/Course";
import { userService } from "../services/UserServices";

export class UserCourseController {
	private _router: Router;

	constructor() {
		this._router = Router();
		this.setRoutes();
	}

	private setRoutes() {
		this.router.post("/create/user/:uid/course/:cid", this.createUserCourse());
		this.router.delete(
			"/delete/user/:uid/course/:cid",
			(req: Request, res: Response) => {
				const { uid, cid } = req.params;

				const userRepo = AppDataSource.getRepository(User);

				userRepo.findOneBy({ id: uid }).then((us) => {
					us.courses = us.courses.filter((course) => {
						return course.id != cid;
					});

					userRepo
						.save(us)
						.then((u) => {
							res.json({ msg: "successful deleted", user: u });
						})
						.catch((err) => {
							res.json({ msg: "failure!!!", err: err });
						});
				});
			}
		);
	}

	private createUserCourse() {
		return (req: Request, res: Response) => {
			//....
			const { uid, cid } = req.params;

			const courseRepo = AppDataSource.getRepository(Course);
			const userRepo = AppDataSource.getRepository(User);

			courseRepo
				.findOneBy({ id: cid })
				.then((course) => {
					userRepo
						.findOneBy({ id: uid })
						.then((us) => {
							us.courses = [...us.courses, course];
							userRepo
								.save(us)
								.then((u) => {
									res.json({ msg: "successful added", user: u });
								})
								.catch((err) => {
									res.json({ msg: "failure!!!", err: err });
								});
						})
						.catch((err) => {
							res.json({ msg: "cannot find user!!!", err: err });
						});
				})
				.catch((err) => {
					res.json({ msg: "cannot find course!!!", err: err });
				});
		};
	}

	public get router() {
		return this._router;
	}
}
