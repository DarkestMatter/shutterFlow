export enum userStatus {
  registered = "Registered",
  verified = "Verified",
  inactive = "Inactive",
}

export enum customerType {
  user = "user",
  client = "client",
  both = "both",
}

export enum dialogName {
  otpDialog = "otpDialog",
  addClientDialog = "addClientDialog",
  addEventDialog = "addEventDialog",
  fileNameListDialog = "fileNameListDialog",
}

export enum uploadImgFormat {
  jpg = "image/jpg",
  jpeg = "image/jpeg",
  png = "image/png",
  webp = "image/webp",
}

export enum selectFile {
  all = "All",
  one = "One",
}

export enum imgDimensionType {
  landscape = "l",
  portrait = "p",
}

export enum lazyLoadOffset {
  offset = 200,
}
