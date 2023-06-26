import { BaseEntity } from "../BaseEntity";
import { AccountType } from "./AccountType";
import { Address } from "./Address";

export class User extends BaseEntity {
    name!: string;
    lastName!: string;
    birthDate!: string;
    email!: string;
    phoneNumber!: string;
    address!: Address;
    password!: string;
    accountType!: AccountType;
    permissions: string = '';
    isSocial: boolean | undefined;
    socialProvider: string | undefined;
}