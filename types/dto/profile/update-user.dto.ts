export type UpdateUserDto = Partial<{
  firstName: string;
  lastName: string;
  referralCode: string;
  email: string;
  avatarId?: number | null;
}>;
