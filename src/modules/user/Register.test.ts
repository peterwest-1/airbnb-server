import { gcall } from "../../test-utils/gcall";
import { testDataSource } from "../../test-data-source";
import { faker } from "@faker-js/faker";
import { User } from "../../entity/User";
let dataSource;
beforeAll(async () => {
  dataSource = testDataSource();
  await dataSource.initialize();
});

const registerMutation = `
mutation Register($data: AuthenticationInput!) {
  register(data: $data) {
    user {
      email
    }
    errors {
      field
      message
    }
  }
}
`;

describe("Register", () => {
  test("should create user", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gcall({
      source: registerMutation,
      variableValues: {
        data: {
          email: user.email,
          password: user.password,
        },
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          user: {
            email: user.email,
          },
          errors: null,
        },
      },
    });

    // const dbUser = await User.findOne({ where: { email: fakerUser.email } });
    // expect(dbUser).toBeDefined();
    // expect(dbUser!.confirmed).toBeFalsy();
    // expect(dbUser!.email).toBe(fakerUser.email);
  });
});
