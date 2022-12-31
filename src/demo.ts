class Contact {
  id;
  name;
  birthDate;
}

let x: number;
let y: string;

type ContactName = string;
interface IContact {
  id: number;
  name: ContactName;
  birthDate?: Date;
  status?: ContactStatus;
  clone(contact: IContact): IContact;
}

enum ContactStatus {
  Active = "A",
  Inactive = "I",
  New = "N",
}

let primaryContact: IContact = {
  id: 1,
  name: "Sam",
  status: ContactStatus.New,
  clone: function (contact): IContact {
    return Object.apply({}, contact);
  },
};
