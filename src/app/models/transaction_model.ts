
export interface ITransaction {
    transactionId:          number | null;
    accountNumber:          number | null;
    receiverAccountNumber:number | null;
    transactionDate:        Date | null;
    tansactionType:         number | null;
    transactionAmount:      BigInt | null;
    transactionDescription: string | null;

 
}