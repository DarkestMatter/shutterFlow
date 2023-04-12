export enum errorMsg {
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
  errorAtDeleteFile = "Some error occurred while deleting a file",
  userExist = "User already exists, Please try Login",
  clientExist = "Client already exists, Please try another Mobile no",
  invalidToken = "Token is invalid, Please Login again",
  eventExists = "Event Already Exists, please create with different Name",
  incorrectUploadFormat = "Only .png, .jpg and .jpeg format allowed!",
  errorFileUpload = "Error at file uploading",
  errorAtFileLiked = "Some error occurred while liking a file",
}

export enum successMsg {
  loginSuccess = "login successful",
  clientAdded = "Client added successfully",
  enterOtp = "Enter OTP recieved on your email ID",
}

export enum registrationStatus {
  registered = "Registered",
  verified = "Verified",
  inactive = "Inactive",
}

export enum eventName {
  defaultEventName = "HighLight",
}

export enum customerType {
  user = "user",
  client = "client",
}

export enum imgDimensionType {
  landscape = "l",
  portrait = "p",
}

export enum uploadImgFormat {
  jpg = "image/jpg",
  jpeg = "image/jpeg",
  png = "image/png",
  webp = "image/webp",
}

export enum uploadVideoFormat {
  mp4 = "image/mp4",
  mkv = "image/mkv",
}

export enum iDriveData {
  bucket = "shutter-flow",
  acl = "public-read",
  baseUrl = "https://shutter-flow.c3l1.c10.e2-3.dev/",
}

export enum fileType {
  img = "image",
  video = "video",
}
