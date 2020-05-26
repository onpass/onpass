import { User } from "../src/entity/User";
import bcrypt from "bcrypt";
import { Entry } from "../src/entity/Entry";
import aes256 from "aes256";

let user = new User();
user.username = "username";
user.password = "password";
user.email = "email";
const salt = bcrypt.genSaltSync(8);
let key = bcrypt.hashSync("password", salt);

user.hashPassword(salt);

test("Hash password test", () =>
    expect(user.password).toBe(key)
);

test("Check password test",() =>
    expect(user.checkPassword("password")).toBe(true)
);
let entry = new Entry();

entry.website = "helloworld.com";
entry.login = "bonjour";
entry.password = "password";
entry.user = user;

key = user.password



test("Encrypt test", () => {
    console.log(JSON.stringify(entry))
    entry.encryptData(key)
    console.log(JSON.stringify(entry))
    console.log(key)
    expect(entry.login).toBe(aes256.encrypt(key, "bonjour"));
    expect(entry.password).toBe(aes256.encrypt(key, "password"));
});

test("Decrypt test",() => {
    entry.decryptData(key)
    expect(entry.login).toBe("bonjour");
    expect(entry.password).toBe("password");
});