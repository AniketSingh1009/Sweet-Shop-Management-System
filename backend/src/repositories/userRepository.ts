import { User } from "../types/User";

let users: User[] = [];

export const resetUsers = () => {
  users = [];
};


export const findUserByEmail = (email: string): User | undefined => {
  return users.find((u) => u.email === email);
};

export const saveUser = (user: User): void => {
  users.push(user);
};
export { users };
