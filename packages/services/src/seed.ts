import { db } from "./lib/db";

const quantity = 40;

type ApiResponse = {
	gender: "male" | "female";
	email: string;
	cell: string;
	name: {
		first: string;
		last: string;
	};
	dob: {
		age: number;
	};
	picture: {
		large: string;
		medium: string;
		thumbnail: string;
	};
	location: {
		street: {
			number: number;
			name: string;
		};
		city: string;
		state: string;
		country: string;
		postcode: number;
	};
};

async function main() {
	const profiles = await fetch(
		`https://randomuser.me/api/?results=${quantity}&nat=br`,
	)
		.then((t) => t.json())
		.then((t) => t.results);

	await Promise.all(
		profiles.map((profile: ApiResponse) =>
			db.entity.create({
				data: {
					name: `${profile.name.first} ${profile.name.last}`,
					type: "person",
					description: "",
					id_user_created: "clydp3jxl00002tduqdonwcw9",
					data: {
						create: {
							age: profile.dob.age,
							race: "Branca",
							gender: profile.gender,
						},
					},
					pictures: {
						createMany: {
							data: [
								{
									key: `${Math.ceil(Math.random() * 1000)}`,
									url: profile.picture.large,
								},
							],
						},
					},
					addresses: {
						createMany: {
							data: [
								{
									state: profile.location.state,
									city: profile.location.city,
									country: "Brasil",
									district: "",
								},
							],
						},
					},
					contact: {
						create: {
							description: "",
							options: [
								{ type: "email", value: profile.email },
								{ type: "phone", value: profile.cell },
							],
						},
					},
				},
			}),
		),
	);

	await db.$disconnect();
	console.log("Database seeded!");
	process.exit(0);
}

main();
