import { AddressModel } from './AddressModel';

export class PersonModel {
  id: string = '';
  name: string = '';
  address?: AddressModel;
  cfp: string = '';
  phone: string = '';
  personalEmail: string = '';
  birthDate?: Date;
  sex: string = '';
  fatherName: string = '';
  motherName: string = '';
  isHandicapped: boolean = false;
  isBloodDonor: boolean = false;
}
