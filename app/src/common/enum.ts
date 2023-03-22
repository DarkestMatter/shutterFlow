const enum errorMsg {
  serverError = "Some Error occurred",
  incorrectOtp = "enter correct otp",
  incorrectUserEmail = "Please login again with proper Email",
  userExist = "User already exists, Please try Login",
  invalidToken = "Token is invalid, Please Login again",
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
