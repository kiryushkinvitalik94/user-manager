import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUserByuuid } from "../../features/users/usersSlice";
import {
  deleteUserAsync,
  updateUserAsync,
} from "../../features/user/userSlice";
import { User } from "../../interfaces/User";
import UserDetails from "../UserDetails";
import UserForm from "../UserForm";
import Popup from "../Popup";

import styles from "./User.module.css";

export default function UserComponent() {
  const { id } = useParams<{ id: string }>();
  const user: User | undefined = useAppSelector(selectUserByuuid(id));
  const dispatch = useAppDispatch();
  let history = useHistory();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);

  const handlerOnEditOrCancelClick = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  };

  const handlerOnRemoveUserClick = () => {
    setIsShowPopup(true);
  };

  const handlerOnbtnApplyClick = () => {
    setIsShowPopup(false);
    dispatch(deleteUserAsync(id));
    history.push("/");
  };

  const handlerOnbtnCancellClick = () => {
    setIsShowPopup(false);
  };

  const handlerOnFormSubmit = (updateUserData: User) => {
    dispatch(updateUserAsync(updateUserData));
    history.push("/");
  };

  if (!user) {
    return <div className={styles.userNotFound}>User not found!!!</div>;
  }

  return (
    <>
      <div className={styles.userContainer}>
        <div className={styles.userIconContainer}>
          <img src={user.picture.large} />
        </div>
        {isEditMode ? (
          <UserForm user={user} handlerOnFormSubmit={handlerOnFormSubmit} />
        ) : (
          <UserDetails user={user} />
        )}

        <div className={styles.btnContainer}>
          <button
            onClick={handlerOnRemoveUserClick}
            className={styles.btnRemove}
          >
            remove
          </button>

          <button
            onClick={handlerOnEditOrCancelClick}
            className={styles.btnInfo}
          >
            {!isEditMode ? "edit" : "cancel"}
          </button>
        </div>
      </div>
      {isShowPopup ? (
        <Popup
          handlerOnbtnApplyClick={handlerOnbtnApplyClick}
          handlerOnbtnCancellClick={handlerOnbtnCancellClick}
          btnApplyText="i'm sure remove  user"
          popupText={"Are you sure you want to delete the user?"}
        />
      ) : (
        ""
      )}
    </>
  );
}
