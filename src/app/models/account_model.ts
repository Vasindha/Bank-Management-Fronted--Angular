export interface IAccount {
    accountNumber: number;
    customerId:    number;
    accountType:   number;
    amount:        BigInt|number ;
    interestRate:  number ;
    openDate:      Date|null;
    accountStatus: number;
}


