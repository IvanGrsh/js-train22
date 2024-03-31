class RecentPurchases {
  static #instance = null;

  static #purchases = [];

  constructor() {
    this.purchases = [];
  }

  static create() {
    if (!this.#instance) {
      this.#instance = new RecentPurchases();
    }

    return this.#instance;
  }

  static add(item) {
    this.#purchases.push(item);
  }
  //   add(item) {
  //     this.purchases.push(item);
  //   }

  static get() {
    return this.#purchases;
  }
  //   get() {
  //     return this.purchases;
  //   }
}

RecentPurchases.create();

RecentPurchases.add("Telephone");
RecentPurchases.add("Headphones");

console.log(RecentPurchases.get());

// const lastPurchaseList = RecentPurchases.create();
//====================
// const lastPurchaseList2 = RecentPurchases.create();

// console.log(lastPurchaseList === lastPurchaseList2);

// lastPurchaseList2.add("Telephone");
// lastPurchaseList2.add("Headphones");

// console.log(lastPurchaseList.get());

///====================================================

class Button {
  constructor({ text, color }) {
    this.text = text;
    this.color = color;
  }

  render() {
    return `<button class='color:${this.color};'>${this.text}</button>`;
  }
}

class IconButton {
  constructor(icon, color) {
    this.icon = icon;
    this.color = color;
  }

  render() {
    return `<button class='color:${this.color};'><img src="${this.icon}"/></button>`;
  }
}

class ButtonFactory {
  static TYPE = {
    BASIC: "basic",
    ICON: "icon",
  };

  static createButton(type, option) {
    if (option.icon) {
      return new IconButton(option);
    }
    if (option.text) {
      return new Button(option);
    }

    throw new Error(`Такого типу кнопки не існує: ${type}`);

    // switch (type) {
    //   case this.TYPE.BASIC:
    //     return new Button(option);
    //   case this.TYPE.ICON:
    //     return new IconButton(option);
    //   default:
    //     throw new Error(`Такого типу кнопки не існує: ${type}`);
    // }
  }
}

const myIconButton = ButtonFactory.createButton(ButtonFactory.TYPE.ICON, {
  color: "red",
  icon: `'/icon/my-icon.svg`,
});
console.log(myIconButton);
///====================================================

class User {
  constructor(email) {
    this.email = email;
  }

  sendEmail(message) {
    console.log(`Відправка на email ${this.email} повідомення: ${message}`);
  }
}

class Video {
  constructor(name) {
    this.name = name;
  }
}

class Channel {
  constructor(name) {
    this.name = name;
    this.subscribers = [];
  }

  subscribe(user) {
    this.subscribers.push(user);
  }

  unsubscribe(user) {
    this.subscribers = this.subscribers.filter((sub) => sub !== user);
  }

  createVideo(name) {
    const video = new Video(name);
    this.sendNotify(video);
  }

  sendNotify(video) {
    this.subscribers.forEach((subscriber) => {
      subscriber.sendEmail(
        `Нове відео"${video.name}"  на YouTube каналі ${this.name}`
      );
    });
  }
}

const channel = new Channel("IT Brains");

const user1 = new User("John@example.com");
const user2 = new User("Jane@example.com");
const user3 = new User("Alice@example.com");

channel.subscribe(user1);
channel.subscribe(user2);
channel.subscribe(user3);

channel.createVideo("Урок по HTML");

console.log("====================================================");

channel.unsubscribe(user1);
channel.createVideo("Урок по CSS");
///====================================================

class Coffe {
  name = "Kava";
  cost = 10;

  cook() {
    console.log(`Приготування ${this.name}`);
  }
}
class MilkDecorator {
  constructor(coffe, amount) {
    this.coffe = coffe;
    this.amount = amount;
  }

  get name() {
    return `${this.coffe.name}, з ${this.amount} мл молока`;
  }

  get cost() {
    const milkPrice = 0.05;
    return this.coffe.cost + milkPrice * this.amount;
  }

  cook() {
    console.log(`Приготування ${this.name}`);
  }
}

let coffe = new Coffe();
console.log(coffe.name);
console.log(coffe.cost);
coffe.cook();

let latteCoffe = new MilkDecorator(coffe, 300);
console.log(latteCoffe.name);
console.log(latteCoffe.cost);
latteCoffe.cook();

///====================================================

class TextEditor {
  #text = "";

  set text(text) {
    this.#text = text;
    this.#save();
  }
  get text() {
    return this.#text;
  }

  #save() {
    Snapshot.create(this.text);
  }

  restore() {
    this.#text = Snapshot.restore().text;
  }
}

class Snapshot {
  constructor(text) {
    this.text = text;
  }

  static #snapshots = [];

  static create(text) {
    this.#snapshots.push(new Snapshot(text));
  }

  static restore() {
    this.#snapshots.pop();
    return this.#snapshots[this.#snapshots.length - 1];
  }
}

const editor = new TextEditor();

editor.text = "Це початковий текст.";
editor.text = "Редактований текст.";
editor.text = "Оновленний текст.";

console.log("======================");

console.log(editor.text);

console.log("======================");

editor.restore();

console.log(editor.text);

editor.restore();

console.log(editor.text);

///====================================================
console.log("======================");

class AuthHandler {
  setNextHandler(handler) {
    this.nextHandler = handler;
    return handler;
  }

  login(user, password) {
    if (this.nextHandler) {
      return this.nextHandler.login(user, password);
    } else {
      return false;
    }
  }
}

class TwoFactorAuthHandler extends AuthHandler {
  login(user, password) {
    if (
      user === "John" &&
      password === "password" &&
      this.isValidTwoFactorCode()
    ) {
      console.log("Вхід дозволено з двохфакторною автентифікацією");
      return true;
    } else {
      return super.login(user, password);
    }
  }

  isValidTwoFactorCode() {
    return true;
  }
}

class RoleHandler extends AuthHandler {
  login(user, password) {
    if (user === "guest") {
      console.log("Вхід дозволено в ролли гостя");
      return true;
    } else {
      return super.login(user, password);
    }
  }
}

class CredentialsHandler extends AuthHandler {
  login(user, password) {
    if (user === "admin" && password === "adm123") {
      console.log("Вхід дозволено за логіном та паролем");
      return true;
    } else {
      return super.login(user, password);
    }
  }
}

class HandlerBuilder {
  constructor() {
    this.firstHandler = null;
    this.lastHandler = null;
  }

  add(hendler) {
    if (!this.firstHandler) {
      this.firstHandler = hendler;
      this.lastHandler = hendler;
    } else {
      this.lastHandler.setNextHandler(hendler);
      this.lastHandler = hendler;
    }
    return this;
  }

  create() {
    return this.firstHandler;
  }
}

const handlerBuilder = new HandlerBuilder();

const handler = handlerBuilder
  .add(new CredentialsHandler())
  .add(new TwoFactorAuthHandler())
  .add(new RoleHandler())
  .create();

handler.login("admin", "adm123");
handler.login("John", "password");
handler.login("guest", "guest123");
handler.login("user", "password");

///============

// const handler = new TwoFactorAuthHandler();
// const handler2 = new CredentialsHandler();

// handler.setNextHandler(handler2);
// // handler.setNextHandler(new CredentialsHandler());
// handler2.setNextHandler(new RoleHandler());

// handler.login("admin", "adm123");
// // handler2.login("guest");

///============

// const handler = new TwoFactorAuthHandler();
// handler.setNextHandler({
//   login: (login, password) => {
//     const result =
//       login === "login" && password === "password"
//         ? "Користувач увійшов в аккаунт"
//         : "Користувач не увійшов в аккаунт";
//     console.log(result);
//     return result;
//     // console.log(arg);
//   },
// });
// handler.login("login", "password");
///====================================================
console.log("======================");
class UserTalk {
  constructor(name, messanger) {
    this.name = name;
    this.messanger = messanger;
  }

  sendMessage(message) {
    const formattedMessage = this.formatMessage(message);
    this.messanger.sendMessage(formattedMessage);
  }

  formatMessage(message) {
    return `[${this.name}]: ${message}`;
  }
}

class SMSMessanger {
  static sendMessage(message) {
    console.log(`Відправленно SMS: ${message}`);
  }
}

class EmailMessanger {
  static sendMessage(message) {
    console.log(`Відправленно Email: ${message}`);
  }
}

const john = new UserTalk("John", SMSMessanger);
const jane = new UserTalk("Jane", EmailMessanger);

john.sendMessage("Hello!");
jane.sendMessage("Hello!");
