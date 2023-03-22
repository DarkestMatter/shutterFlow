import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isNumeric from "validator/lib/isNumeric";

export const validateForm = (
  value: string | number | Date,
  valueKey: string
) => {
  const selectedDate = new Date(value);
  const parsedDate = new Date();
  const isTodaysDate =
    `${selectedDate?.getDate()}${selectedDate?.getMonth()}${selectedDate?.getFullYear()}` ===
    `${parsedDate?.getDate()}${parsedDate?.getMonth()}${parsedDate?.getFullYear()}`;
  if (valueKey === "name") {
    if (isEmpty(value.toString())) {
      return "Name can not be empty";
    } else if (value.toString().length > 100) {
      return "Name can not exceed 100 characters";
    }
  }
  if (valueKey === "email") {
    if (isEmpty(value.toString())) {
      return "Email can not be empty";
    } else if (!isEmail(value.toString())) {
      return "Enter valid Email";
    }
  }
  if (valueKey === "phone") {
    if (isEmpty(value.toString())) {
      return "Phone no can not be empty";
    } else if (!isNumeric(value.toString())) {
      return "Enter valid Phone no";
    } else if (value.toString().length !== 10) {
      return "Enter valid Phone no";
    }
  }
  if (valueKey === "message") {
    if (value.toString().length > 1000) {
      return "Message can not exceed 100 characters";
    }
  }
  if (valueKey === "dateOfShoot") {
    if ("" === value || isTodaysDate) {
      return `Select Date greater than today's date`;
    }
  }
};

export const valdiateFormObj = (getFormInput: IFormValues) => {
  const selectedDate = new Date(getFormInput?.dateOfShoot as unknown as Date);
  const parsedDate = new Date();
  const isTodaysDate =
    `${selectedDate?.getDate()}${selectedDate?.getMonth()}${selectedDate?.getFullYear()}` ===
    `${parsedDate?.getDate()}${parsedDate?.getMonth()}${parsedDate?.getFullYear()}`;
  if (typeof getFormInput.name === undefined || getFormInput?.name === "") {
    return { key: "name", msg: "Name can not be empty" };
  } else if (
    typeof getFormInput.email === undefined ||
    getFormInput?.email === ""
  ) {
    return { key: "email", msg: "Email can not be empty" };
  } else if (
    typeof getFormInput.phone === undefined ||
    getFormInput?.phone === ""
  ) {
    return { key: "phone", msg: "Phone no can not be empty" };
  } else if (
    !isNumeric(getFormInput?.phone?.toString() as unknown as string) ||
    getFormInput?.phone?.toString().length !== 10
  ) {
    return { key: "phone", msg: "Enter valid Phone no" };
  } else if (
    !getFormInput?.dateOfShoot ||
    typeof getFormInput?.dateOfShoot === undefined ||
    isTodaysDate
  ) {
    return { key: "dateOfShoot", msg: `Select Date greater than today's date` };
  } else {
    return {};
  }
};
