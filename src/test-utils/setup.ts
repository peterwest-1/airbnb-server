import { testDataSource } from "../test-data-source";

const testing = async () => {
  await testDataSource(true)
    .initialize()
    .then(() => {})
    .catch((err) => {
      console.error("Testing Error during Data Source initialization", err);
    });
};

testing().catch((err) => {
  console.log(err);
});
