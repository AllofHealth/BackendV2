export interface CreateMedicineInterface {
    productPrescribed: string;
    productCategory: string;
    productDosage: string;
    practitionerNote: string;
}
export interface CreateReceiptInterface {
    productDispensed: string;
    directions: string;
    quantity: string;
    price: string;
}
export interface DrugClassDescriptionInterface {
    name: string;
    description: string;
}
export declare const drugClassesDescription: DrugClassDescriptionInterface[];
