import { BaseEntity } from "../BaseEntity";

export interface Address extends BaseEntity {
    country: number;
    state: number;
    district: number;
}