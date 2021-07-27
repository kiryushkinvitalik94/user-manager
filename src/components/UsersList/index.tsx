import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getUsersAsync, selectUsers } from "../../reducers/users/usersSlice";
import UserListItem from "../UserListItem";
import { User } from "../../interfaces/User";

import styles from "./UserList.module.css";

export default function UsersList() {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(getUsersAsync(10));
  }, [dispatch]);

  const [genderFilter, setGenderFilter] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    if (genderFilter === "all") {
      setFilteredUsers(users);
    } else {
      const filteredUsers: Array<User> | [] = users.filter(
        (user: User) => user.gender === genderFilter
      );
      setFilteredUsers(filteredUsers);
    }
  }, [genderFilter, users]);

  const handlerOnUserClick = (user: User) => {
    const uuid = user.login.uuid;
    history.push(`/user${uuid}`);
  };

  const handlerOnSelectGenderChange = (e: any) => {
    setGenderFilter(e.target.value);
  };

  return (
    <div>
      <div className={styles.userListSelect}>
        <label htmlFor="genderFilter">Select Gender: </label>
        <select
          value={genderFilter}
          onChange={handlerOnSelectGenderChange}
          name="gender"
          id="genderFilter"
        >
          <option>female</option>
          <option>male</option>
          <option>all</option>
        </select>
      </div>

      <ul className={styles.userList}>
        {filteredUsers.map((user: User) => (
          <li key={user.login.uuid} onClick={() => handlerOnUserClick(user)}>
            <UserListItem user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
