export function fetchUsers(usersCount: Number = 10) {
  return fetch(
    // `https://randomuser.me/api/?results=${usersCount}&inc=name,gender,nat,login,phone,id,email,dob`
    `https://randomuser.me/api/?results=${usersCount}`
  );
}
