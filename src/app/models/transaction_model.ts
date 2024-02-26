
export interface ITransaction {
    transactionId:          number | null;
    accountNumber:          number | null;
    transactionDate:        Date | null;
    tansactionType:         number | null;
    transactionAmount:      number | null;
    transactionDescription: string | null;
}