export interface ICustomer {
   
    customerId:number | null;
    customerFirstname:   string;
    customerMiddletname: string;
    customerLastname:    string;
    customerAddress:     string;
    customerDob:         Date | null | string;
    customerMobileno:    number|null;
    customerEmail:       string;
    customerAadharno:    number|null;
    accountType:number | null;
 
}
