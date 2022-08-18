export type GetProductGradeListDto = Readonly<{
  productId: number;
  withComments?: boolean;
  isApproved?: boolean;
  waitConfirmation?: boolean;
}>;
