export type SBPResponseDto = {
  Model: {
    QrUrl: string;
    QrImage: string;
    TransactionId: number;
    ProviderQrId: number;
    Amount: number;
    Message: string;
  };
  Success: boolean;
  Message: string | null;
};
