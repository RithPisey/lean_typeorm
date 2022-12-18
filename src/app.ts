import express from "express";
import AppDataSource from "./data-source";
import { UserController } from "./controllers/UserController";
import { DataSource } from "typeorm";
import { UserCourseController } from "./controllers/UserCourseController";
import { FetchUserController } from "./controllers/FetchUserController";

class Application {
	private _app: express.Application;
	private userController: UserController;
	private userCourseController: UserCourseController;
	private fetchUserController: FetchUserController;
	private initializeDB: Promise<DataSource>;

	constructor() {
		this.initializeDB = AppDataSource.initialize();
		this._app = express();
		this.userController = new UserController();
		this.userCourseController = new UserCourseController();
		this.fetchUserController = new FetchUserController();
		this.setConfig();
		this.routController();
	}

	private setConfig() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private routController() {
		this.app.use(this.userController.router);
		this.app.use(this.userCourseController.router);
		this.app.use(this.fetchUserController.router);
	}

	public get app(): express.Application {
		return this._app;
	}
}

export default new Application().app;
