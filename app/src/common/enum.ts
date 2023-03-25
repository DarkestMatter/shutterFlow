const enum errorMsg {
  registrationError = "Error occurred while Registration",
  noLoginCredFound = "No valid login cred found",
  loginError = "Error occurred while Login",
  noValidUser = "No Valid User Found",
  userFoundError = "Error while finding user",
  errorAtOtp = "Error occurred while validating OTP",
  errorAtClientList = "Error occurred while finding client List",
  errorAtAddCLient = "Error occurred while adding client",
  errorAtAddEvent = "Error occurred while adding event",
  errorAtUpdateClientEvent = "Error occurred while updating event in client data",
  serverError = "Some Error occurred",
  incorrectOtp = "enter correct otp",
  incorrectUserEmail = "Please login again with proper Email",
  userExist = "User already exists, Please try Login",
  invalidToken = "Token is invalid, Please Login again",
  eventExists = "Event Already Exists, please create with different Name",
}

const enum successMsg {
  loginSuccess = "login successful",
  clientAdded = "Client added successfully",
  enterOtp = "Enter OTP recieved on your email ID",
}

const enum statusEnum {
  registered = "Registered",
  verified = "Verified",
  inactive = "Inactive",
}

const enum eventName {
  defaultEventName = "HighLight",
}

const enum customerType {
  user = "user",
  client = "client",
}
