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
}

function clone<T>(source: T): T {
  return Object.apply({}, source);
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
};

const dateRange = { startDate: Date.now(), endDate: Date.now() };
const dateRangeCopy = clone(dateRange);
