import type { Prisma } from "@/lib/prisma/generated";
import { Gender } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

export function influencerInformationFactory(): Prisma.InfluencerInformationCreateWithoutInfluencerInput {
  const gender = faker.helpers.enumValue(Gender);
  const firstName = faker.person.firstName(
    gender === Gender.MALE ? "male" : "female",
  );
  const lastName = faker.person.lastName();
  const firstNameKana = faker.person.firstName();
  const lastNameKana = faker.person.lastName();
  const displayName = `${firstName} (${faker.helpers.arrayElement(["@", ""])})${faker.internet.username()}`;

  return {
    displayName,
    email: faker.internet.email(),
    lastName,
    firstName,
    lastNameKana,
    firstNameKana,
    birthday: faker.date.birthdate({ min: 18, max: 35, mode: "age" }),
    gender,
    phone:
      "0" +
      faker.string.numeric(2) +
      "-" +
      faker.string.numeric(4) +
      "-" +
      faker.string.numeric(4),
  };
}
