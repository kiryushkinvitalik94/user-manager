import { useState } from "react";
import styles from "./UserForm.module.css";
import { User } from "../../interfaces/User";

type propsType = {
  user: User;
  handlerOnFormSubmit: (updateUserData: User) => void;
};

type typeDateForUpdate = {
  firstName?: string;
  lastName?: string;
  dob?: string;
  phone: string;
  email: string;
};

export default function UserFormUpdate(props: propsType) {
  const { user, handlerOnFormSubmit } = props;

  const [dateForUpdate, setDateForUpdate] = useState<typeDateForUpdate>({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
  });

  const hanlerOnInput = (e: any) => {
    const newState = { [e.target.name]: e.target.value };
    setDateForUpdate((state) => ({ ...state, ...newState }));
  };

  const handlerOnSubmit = (e: any) => {
    e.preventDefault();
    const updateUserData = dateSerialization();
    handlerOnFormSubmit(updateUserData);
  };

  const dateSerialization = () => {
    const newUserData = { ...user };
    if (dateForUpdate.firstName) {
      newUserData.name.first = dateForUpdate.firstName;
    }
    if (dateForUpdate.lastName) {
      newUserData.name.last = dateForUpdate.lastName;
    }
    if (dateForUpdate.dob) {
      newUserData.dob.date = new Date(dateForUpdate.dob).toISOString();
    }
    if (dateForUpdate.phone) {
      newUserData.phone = dateForUpdate.phone;
    }
    if (dateForUpdate.email) {
      newUserData.email = dateForUpdate.email;
    }
    return newUserData;
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handlerOnSubmit} className={styles.userForm}>
        <div className={styles.formField}>
          <label>first name: </label>
          <input
            onInput={hanlerOnInput}
            defaultValue={user.name.first}
            placeholder="first name"
            name="firstName"
            type="text"
          />
        </div>
        <div className={styles.formField}>
          <label>last name: </label>
          <input
            onInput={hanlerOnInput}
            defaultValue={user.name.last}
            placeholder="last name"
            name="lastName"
            type="text"
          />
        </div>
        <div className={styles.formField}>
          <label>day of birthday: </label>
          <input
            onInput={hanlerOnInput}
            defaultValue={new Date(user.dob.date)
              .toISOString()
              .substring(0, 10)}
            placeholder="day of birthday"
            name="dob"
            type="date"
          />
        </div>
        <div className={styles.formField}>
          <label>mobile: </label>
          <input
            onInput={hanlerOnInput}
            defaultValue={user.phone}
            placeholder="phone"
            name="phone"
            type="phone"
          />
        </div>
        <div className={styles.formField}>
          <label>email: </label>
          <input
            onInput={hanlerOnInput}
            defaultValue={user.email}
            placeholder="email"
            name="email"
            type="email"
          />
        </div>
        <button className={styles.btnSubmit} type="submit">
          update
        </button>
      </form>
    </div>
  );
}
