import { DUMMY_NAMES_INDO } from "@/lib/data/indonesian-mock";
import { DummyUser } from "@/types/user";

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateDummyUsers(count: number): DummyUser[] {
  const users: DummyUser[] = [];

  for (let i = 0; i < count; i++) {
    const isMale = Math.random() > 0.5;
    const firstName = getRandomItem(
      isMale ? DUMMY_NAMES_INDO.firstNamesMale : DUMMY_NAMES_INDO.firstNamesFemale
    );
    const lastName = getRandomItem(DUMMY_NAMES_INDO.lastNames);
    const name = `${firstName} ${lastName}`;
    const cleanName = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.replace(/[^a-z0-9.]/g, "");

    // Mock NIK
    const provinceCode = "3174"; // Jakarta
    const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
    const nik = `${provinceCode}${randomDigits}`;

    const email = `${cleanName}${Math.floor(Math.random() * 90 + 10)}@${getRandomItem(DUMMY_NAMES_INDO.domains)}`;
    const phone = `08${Math.floor(10 + Math.random() * 89)}${Math.floor(1000000 + Math.random() * 8999999)}`;
    const city = getRandomItem(DUMMY_NAMES_INDO.cities);
    const profession = getRandomItem(DUMMY_NAMES_INDO.professions);
    const company = getRandomItem(DUMMY_NAMES_INDO.companies);

    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

    users.push({
      id: `USR-${1000 + i}`,
      name,
      gender: isMale ? "Laki-laki" : "Perempuan",
      nik,
      email,
      phone,
      city,
      profession,
      company,
      avatarUrl
    });
  }

  return users;
}

export function formatUsersToCSV(users: DummyUser[]): string {
  const headers = ["ID", "Nama", "Jenis Kelamin", "NIK", "Email", "No HP", "Kota", "Pekerjaan", "Perusahaan"];
  const rows = users.map((u) => [
    u.id,
    `"${u.name}"`,
    u.gender,
    `"${u.nik}"`,
    u.email,
    `"${u.phone}"`,
    `"${u.city}"`,
    `"${u.profession}"`,
    `"${u.company}"`
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
