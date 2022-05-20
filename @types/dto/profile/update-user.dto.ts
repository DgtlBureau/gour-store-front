export type UpdateUserDto = Readonly<{
  firstName?: string;
  lastName?: string;
  referralCode?: string;
  email?: string;
  avatarId?: number | null;
}>;
