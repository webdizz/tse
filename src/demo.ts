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
  birthDate?: ContactBirthDate;
  status?: ContactStatus;
}

function clone<T>(source: T): T {
  return Object.apply({}, source);
}

type AnotherContactStatus = "active" | "inactive" | "new";
type ContactBirthDate = Date | number | string;

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

type ContactFields = keyof Contact;

function getValue<T>(source: T, propertyName: keyof T) {
  return source[propertyName];
}

getValue(primaryContact, "id");

let ctx: Record<string, string | number> = { name: "Bruce Lee" };
ctx.id = 1234;

interface Query<TProp> {
  sort?: "asc" | "desc";
  matches(val: TProp): boolean;
}

type TPropContactQuery = {
  [TProp in keyof IContact]?: Query<IContact[TProp]>;
};

type ContactQuery = Omit<
  Partial<Record<keyof IContact, Query<IContact>>>,
  "birthDate" | "status"
>;

type ContactPickQuery = Pick<
  Partial<Record<keyof IContact, Query<IContact>>>,
  "id" | "name"
>;

type RequiredContactQuery = Required<ContactQuery>;

function searchContacts(contacts: IContact[], query: ContactQuery) {
  return contacts.filter((contact) => {
    for (const property of Object.keys(contact)) {
      const propertyQuery = query[property] as Query<IContact[keyof IContact]>;
      if (propertyQuery && propertyQuery.matches(contact[property])) {
        return true;
      }
    }
    return false;
  });
}
