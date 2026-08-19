export type UserGender = "Laki-laki" | "Perempuan";
export type UserViewMode = "cards" | "table";

export interface DummyUser {
  id: string;
  name: string;
  gender: UserGender;
  nik: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  company: string;
  avatarUrl: string;
}
