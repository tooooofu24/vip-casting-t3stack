import type { Prisma } from "@/lib/prisma/generated";
import {
  AgeGroup,
  Gender,
  Genre,
  Objective,
  Region,
} from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

const DEPARTMENTS = ["マーケティング部", "営業部", "広報部", "企画部"];

const POSITIONS = ["部長", "課長", "主任", "担当者"];

export function companyBusinessFactory(): Prisma.CompanyBusinessCreateWithoutCompanyInput {
  return {
    contactName: faker.person.fullName().slice(0, 90),
    department: faker.helpers.arrayElement(DEPARTMENTS),
    position: faker.helpers.arrayElement(POSITIONS),
    phone:
      "0" +
      faker.string.numeric(1) +
      "-" +
      faker.string.numeric(4) +
      "-" +
      faker.string.numeric(4),
    email: `contact@${faker.internet.domainName()}`,
    minBudget: faker.number.int({ min: 50000, max: 500000 }),
    maxBudget: faker.number.int({ min: 500000, max: 5000000 }),
    gender: faker.helpers.enumValue(Gender),
    pastExperience: faker.lorem.paragraph(),
    productDescription: faker.lorem.paragraph(),
    ageGroups: {
      create: faker.helpers
        .arrayElements(Object.values(AgeGroup), { min: 1, max: 3 })
        .map((ageGroup) => ({ ageGroup })),
    },
    regions: {
      create: faker.helpers
        .arrayElements(Object.values(Region), { min: 1, max: 3 })
        .map((region) => ({ region })),
    },
    genres: {
      create: faker.helpers
        .arrayElements(Object.values(Genre), { min: 1, max: 4 })
        .map((genre) => ({ genre })),
    },
    objectives: {
      create: faker.helpers
        .arrayElements(Object.values(Objective), { min: 1, max: 3 })
        .map((objective) => ({ objective })),
    },
  };
}
