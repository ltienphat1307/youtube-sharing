import bcrypt from "bcryptjs";
import sha1 from "sha1";

const saltRounds: number = 10;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

// legacy code
const generateHash = (password: string, passwordHash: string) => {
  const salt = passwordHash.substr(0, 25);
  return salt + sha1(salt + password);
};

export const verifyPassword = (
  password: string,
  hashedPassword: string | undefined = ""
) => {
  return new Promise((resolve, reject) => {
    if (generateHash(password, hashedPassword) === hashedPassword) {
      resolve(true);
    } else {
      bcrypt
        .compare(password, hashedPassword)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};
