import { User } from "../../interfaces/User";

export function fetchUserWithId(uuid: string) {
  return fetch(`https://randomuser.me/api/?uuid=${uuid}`);
}
export function deleteUserWithId(uuid: string) {
  return fetch(`https://randomuser.me/api/?uuid=${uuid}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}
export function updateUserWithId(userData: User) {
  return fetch(`https://randomuser.me/api/?uuid=${userData.login.uuid}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "",
    },
  });
}
