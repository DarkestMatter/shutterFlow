import axios from "axios";

export const setGalleryImgIntoThreeColumns = (galleryList: any) => {
  const listByThree: number = galleryList.length / 3;
  const colOne = galleryList.slice(0, listByThree);
  const colTwo = galleryList.slice(listByThree, listByThree + listByThree);
  const colThree = galleryList.slice(
    listByThree + listByThree,
    listByThree + listByThree + listByThree
  );
  return [colOne, colTwo, colThree];
};

export const handleCategoryBoxAlignment = (idx: number) => {
  if (idx === 0) {
    return "right";
  } else if (idx === 2) {
    return "left";
  } else {
    return "center";
  }
};

export const handleCategoryBoxGrid = (idx: number) => {
  if (idx === 0) {
    return 12;
  } else if (idx === 2) {
    return 6;
  } else {
    return 6;
  }
};

export const getBrowserDetails = async (step: string) => {
  // const baseURL = envProp.api;
  // const res = await axios.get("https://geolocation-db.com/json/");
  // if (res) {
  //   const browserData = (window.navigator as any).userAgentData;
  //   const browserObj: IBrowserDetails = {
  //     brands: browserData?.brands,
  //     mobile: browserData?.mobile,
  //     platform: browserData?.platform,
  //     ipv: res?.data?.IPv4,
  //     country: res?.data?.country_name,
  //     step: step,
  //   };
  //   axios.post(`${baseURL}/saveBrowserDetails`, browserObj).then((response) => {
  //     console.log(response);
  //   });
  // }
};
