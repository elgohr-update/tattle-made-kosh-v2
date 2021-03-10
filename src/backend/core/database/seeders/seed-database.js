const { create } = require("../../../app/user-authentication/repository-user");
const db = require("../../database/models");
const { datasource } = db.sequelize.models;

const user = {
  email: "test_verified_2@test.com",
  password: "Abcdef123$",
  verified: true,
};

const Datasources = [
  {
    name: "checkmate",
    description:
      "A novel dataset that can be used to prioritize check-worthy posts from multi-media content in Hindi.",
    creator: "",
    visibility: "public",
  },
  {
    name: "fearspeech",
    description:
      "Collection of whatsapp messages collected during 2019 Indian General Elections",
    creator: "",
    visibility: "public",
  },
];

const seedDatabase = async () => {
  const userRes = await create(user);
  console.log(
    `Default User Generated - id : ${userRes.id} username :  ${user.email}, password : ${user.password}`
  );

  Datasources[0].creator = userRes.id;
  Datasources[1].creator = userRes.id;

  const checkmateRes = await datasource.create(Datasources[0]);
  console.log(`Checkmate datasource created : ${checkmateRes.id}`);

  const fearspeechRes = await datasource.create(Datasources[1]);
  console.log(`Fearspeech datasource created : ${fearspeechRes.id}`);
};

try {
  seedDatabase();
} catch (err) {
  console.log("Could not seed database");
  console.log(err);
}
