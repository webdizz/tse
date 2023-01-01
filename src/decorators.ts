const currentUser = {
  isInRole(role: string) {
    return true;
  },
  isAuthenticated() {
    return true;
  },
};

function authorize(role: string) {
  return function authorizeDecorator(
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    const wrapped = descriptor.value;
    descriptor.value = function () {
      if (!currentUser.isAuthenticated()) {
        throw Error("User is not authenticated");
      }
      if (!currentUser.isInRole(role)) {
        throw Error(`User is not in role ${role}`);
      }
      return wrapped.apply(this, arguments);
    };
  };
}

function singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class Singleton extends constructor {
    static _instance = null;

    constructor(...args) {
      super(...args);
      if (Singleton._instance == null) {
        Singleton._instance = new Singleton();
      }
    }
  };
}

function auditable(target: object, key: string | symbol) {
  let val = target[key];
  Object.defineProperty(target, key, {
    get: () => val,
    set: (newVal) => {
      console.log(`${key.toString()} changed: `, newVal);
      val = newVal;
    },
    enumerable: true,
    configurable: true,
  });
}

@singleton
class ContactRepository {
  @auditable
  private contacts: Contact[] = [];

  @authorize("ContactViewer")
  getContactById() {
    return "";
  }
}
