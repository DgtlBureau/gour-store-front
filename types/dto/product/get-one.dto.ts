export type ProductGetOneDto = Readonly<{
  id: number;
  withSimilarProducts?: boolean;
  withMeta?: boolean;
  withRoleDiscount?: boolean;
  withGrades?: boolean;
  withMetrics?: boolean;
  withDiscount?: boolean;
  withCategories?: boolean;
}>;
