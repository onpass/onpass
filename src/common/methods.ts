import bcrypt from 'bcrypt'
import aes256 from 'aes256'

const alpha = "abcdefghijklmnopqrstuvwxyz"
const num = "0123456789"
const sym = "`~!@#$%^&*()-_=+[]{}\\|\"';:,.<>/?"

function encrypt(password: string, key: string): string {
    return aes256.encrypt(key, password)
}

function decrypt(password: string, key: string): string {
    return aes256.decrypt(key, password)
}

async function hashPassword(password: string, rounds: number = 10): Promise<string> {
    return bcrypt.hash(password, rounds)
}

async function comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}

function newPassword(length: number, letters: boolean = true, numbers: boolean = true, symbols: boolean = true): string {
    if (length < 8 || length > 127) throw RangeError("The length must be between 8 and 127")
    if (!(letters || numbers || symbols)) throw Error("At least one flag must be enabled")

    var password = "";
    var character = "";
    while (password.length < length) {
        if (letters) {
            let e1 = Math.ceil(alpha.length * Math.random() * Math.random());
            let h = alpha.charAt(e1);
            h = Math.random() > 0.5 ? h.toUpperCase() : h;
            character += h;
        }
        if (numbers) {
            let e2 = Math.ceil(num.length * Math.random() * Math.random());
            character += num.charAt(e2);

        }
        if (symbols) {
            let e3 = Math.ceil(sym.length * Math.random() * Math.random());
            character += sym.charAt(e3);
        }
        password = character;
    }
    password = password.split('').sort(() => { return 0.5 - Math.random() }).join('');
    return password.substr(0, length);
}