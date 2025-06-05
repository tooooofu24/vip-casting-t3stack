import type { Prisma } from "@/lib/prisma/generated";
import { WorkType, Region } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

const NG_PRODUCTS = [
  "タバコ",
  "アルコール",
  "ギャンブル",
  "出会い系",
  "美容整形",
  "投資",
];

const NG_COMPANIES = ["競合他社A", "競合他社B"];

type Props = {
  influencerId: string;
};

export function influencerWorkFactory({
  influencerId,
}: Props): Prisma.InfluencerWorkUncheckedCreateInput {
  return {
    postFee: faker.number.int({ min: 10000, max: 100000 }),
    videoFee: faker.number.int({ min: 30000, max: 300000 }),
    liveFee: faker.number.int({ min: 50000, max: 500000 }),
    eventFee: faker.number.int({ min: 100000, max: 1000000 }),
    workTypes: faker.helpers.arrayElements(Object.values(WorkType), {
      min: 1,
      max: 4,
    }),
    regions: faker.helpers.arrayElements(Object.values(Region), {
      min: 1,
      max: 3,
    }),
    ngProducts: faker.helpers.arrayElements(NG_PRODUCTS, { min: 0, max: 3 }),
    ngCompanies: faker.helpers.arrayElements(NG_COMPANIES, {
      min: 0,
      max: 2,
    }),
    ngOther: faker.helpers.maybe(() => faker.lorem.sentence(), {
      probability: 0.3,
    }),
    prResults: {
      create: Array.from(
        { length: faker.number.int({ min: 0, max: 5 }) },
        () => ({
          company: faker.company.name(),
          content: faker.lorem.sentence(),
          year: faker.date.past({ years: 2 }).getFullYear().toString(),
          month: faker.date.recent().getMonth().toString().padStart(2, "0"),
        }),
      ),
    },
    influencerId,
  };
}
