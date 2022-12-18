import { User } from "./entity/User";
import app from "./app";

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server run on port ${port}...`);
});

// AppDataSource.initialize()
// 	.then(async () => {
// 		console.log("Inserting a new user into the database...");
// 		const user = new User();
// 		user.firstName = "Timber";
// 		user.lastName = "Saw";
// 		user.age = 25;

// 		const userRepository = AppDataSource.getRepository(User);
// 		await userRepository.save(user);
// 	})
// 	.catch((error) => console.log("Unable to connect to Postgres"));
