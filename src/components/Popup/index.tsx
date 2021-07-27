import styles from "./Popup.module.css";

type propsType = {
  handlerOnbtnApplyClick?: () => void;
  handlerOnbtnCancellClick?: () => void;
  btnApplyText?: string;
  showPopup?: boolean;
  btnCancelText?: string;
  popupText?: string;
};

export default function Popup(props: propsType) {
  const {
    btnApplyText,
    btnCancelText,
    handlerOnbtnApplyClick,
    handlerOnbtnCancellClick,
    popupText,
  } = props;

  return (
    <div className={styles.popWrapper}>
      <div className={styles.popupText}>{popupText ? popupText : ""}</div>
      <div className={styles.btnContainer}>
        <button onClick={handlerOnbtnApplyClick} className={styles.btnApply}>
          {btnApplyText ? btnApplyText : "ok"}
        </button>
        <button onClick={handlerOnbtnCancellClick} className={styles.btnCancel}>
          {btnCancelText ? btnCancelText : "cancel"}
        </button>
      </div>
    </div>
  );
}
