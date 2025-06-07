"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Field,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuBuilding2,
  LuCamera,
  LuGlobe,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";

interface CompanyProfile {
  name: string;
  industry: string;
  ceoName: string;
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
  };
  phone: string;
  email: string;
  website: string;
  logo: string;
  description: string;
  registrationDocument: string;
  contacts: {
    name: string;
    department: string;
    position: string;
    phone: string;
    email: string;
  }[];
}

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile>({
    name: "株式会社カイエン",
    industry: "IT・通信",
    ceoName: "佐藤 翔一",
    address: {
      postalCode: "106-6290",
      prefecture: "東京都",
      city: "港区",
      street: "麻布台1-2-1",
      building: "麻布台ヒルズ",
    },
    phone: "03-1234-5678",
    email: "info@cayenne.co.jp",
    website: "https://www.cayenne.co.jp",
    logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    description:
      "インフルエンサーマッチングプラットフォームを運営する企業です。",
    registrationDocument: "",
    contacts: [
      {
        name: "山田 太郎",
        department: "営業部",
        position: "部長",
        phone: "03-1234-5678",
        email: "yamada@cayenne.co.jp",
      },
    ],
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          logo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box py="8" bg="gray.50">
      <Container maxW="4xl">
        <Card.Root overflow="hidden">
          {/* ヘッダー部分 */}
          <Box
            position="relative"
            h="48"
            bgGradient="to-r"
            gradientFrom="purple.600"
            gradientTo="purple.900"
          >
            <Box position="absolute" bottom="-16" left="8">
              <Box position="relative">
                <Image
                  src={profile.logo}
                  alt="Company Logo"
                  width="32"
                  height="32"
                  rounded="lg"
                  borderWidth="4"
                  borderColor="white"
                  objectFit="cover"
                  bg="white"
                />
                {isEditing && (
                  <Box
                    as="label"
                    position="absolute"
                    bottom="0"
                    right="0"
                    bg="purple.600"
                    color="white"
                    p="2"
                    rounded="full"
                    cursor="pointer"
                    _hover={{ bg: "purple.500" }}
                    transition="all 0.2s"
                  >
                    <Icon as={LuCamera} />
                    <Input
                      type="file"
                      display="none"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Box position="absolute" top="4" right="4">
              <Button
                onClick={() => setIsEditing((prev) => !prev)}
                bg="white"
                color="purple.600"
                _hover={{ bg: "purple.50" }}
              >
                {isEditing ? "保存" : "編集"}
              </Button>
            </Box>
          </Box>

          <Card.Body pt="20" px="8" pb="8">
            {/* 基本情報セクション */}
            <Stack gap="6">
              <Heading
                as="h2"
                fontSize="lg"
                fontWeight="semibold"
                mb="4"
                display="flex"
                alignItems="center"
                gap="2"
              >
                <Icon as={LuBuilding2} color="purple.600" />
                基本情報
              </Heading>
              <Field.Root required>
                <Field.Label>
                  会社名 <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="会社名を入力"
                  />
                ) : (
                  <Text>{profile.name}</Text>
                )}
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  業種 <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={profile.industry}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          industry: e.target.value,
                        }))
                      }
                    >
                      <option value="IT・通信">IT・通信</option>
                      <option value="小売">小売</option>
                      <option value="製造">製造</option>
                      <option value="サービス">サービス</option>
                      <option value="金融">金融</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                ) : (
                  <Text>{profile.industry}</Text>
                )}
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  代表者名 <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <Input
                    value={profile.ceoName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        ceoName: e.target.value,
                      }))
                    }
                    placeholder="代表者名を入力"
                  />
                ) : (
                  <Text>{profile.ceoName}</Text>
                )}
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  電話番号 <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <InputGroup
                    startElement={<Icon as={LuPhone} color="fg.muted" />}
                  >
                    <Input
                      type="tel"
                      value={profile.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProfile((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="電話番号を入力"
                    />
                  </InputGroup>
                ) : (
                  <Text>{profile.phone}</Text>
                )}
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  メールアドレス <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <InputGroup
                    startElement={<Icon as={LuMail} color="fg.muted" />}
                  >
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProfile((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="メールアドレスを入力"
                    />
                  </InputGroup>
                ) : (
                  <Text>{profile.email}</Text>
                )}
              </Field.Root>

              <Field.Root>
                <Field.Label>ウェブサイト</Field.Label>
                {isEditing ? (
                  <InputGroup
                    startElement={<Icon as={LuGlobe} color="fg.muted" />}
                  >
                    <Input
                      type="url"
                      value={profile.website}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProfile((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      placeholder="ウェブサイトのURLを入力"
                    />
                  </InputGroup>
                ) : (
                  <Text>{profile.website}</Text>
                )}
              </Field.Root>
            </Stack>

            {/* 所在地セクション */}
            <Stack gap="6" mt="8">
              <Heading
                as="h2"
                fontSize="lg"
                fontWeight="semibold"
                display="flex"
                alignItems="center"
                gap="2"
              >
                <Icon as={LuMapPin} color="purple.600" />
                所在地
              </Heading>

              <Field.Root required>
                <Field.Label>
                  郵便番号 <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <Input
                    value={profile.address.postalCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProfile((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          postalCode: e.target.value,
                        },
                      }))
                    }
                    placeholder="郵便番号を入力"
                  />
                ) : (
                  <Text>{profile.address.postalCode}</Text>
                )}
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  都道府県 <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <Input
                    value={profile.address.prefecture}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProfile((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          prefecture: e.target.value,
                        },
                      }))
                    }
                    placeholder="都道府県を入力"
                  />
                ) : (
                  <Text>{profile.address.prefecture}</Text>
                )}
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  市区町村 <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <Input
                    value={profile.address.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProfile((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          city: e.target.value,
                        },
                      }))
                    }
                    placeholder="市区町村を入力"
                  />
                ) : (
                  <Text>{profile.address.city}</Text>
                )}
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  番地 <Field.RequiredIndicator />
                </Field.Label>
                {isEditing ? (
                  <Input
                    value={profile.address.street}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProfile((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          street: e.target.value,
                        },
                      }))
                    }
                    placeholder="番地を入力"
                  />
                ) : (
                  <Text>{profile.address.street}</Text>
                )}
              </Field.Root>

              <Field.Root>
                <Field.Label>建物名・階数</Field.Label>
                {isEditing ? (
                  <Input
                    value={profile.address.building}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProfile((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          building: e.target.value,
                        },
                      }))
                    }
                    placeholder="建物名・階数を入力"
                  />
                ) : (
                  <Text>{profile.address.building}</Text>
                )}
              </Field.Root>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
