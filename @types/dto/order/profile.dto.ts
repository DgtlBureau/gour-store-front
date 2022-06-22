export type OrderProfileDto = {
  title: string;
  cityId: number;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  comment?: string;
  isMain: boolean;
};