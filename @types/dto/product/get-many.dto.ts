export type ProductGetManyDto = Readonly<{
  withSimilarProducts?: boolean;
  withMeta?: boolean;
  withRoleDiscount?: boolean;
  withGrades?: boolean;
  withMetrics?: boolean;
  withPromotions?: boolean;
}>;
