import { rm } from "fs";
import { ErrorHandler } from "./exceptions.js";

export const isFieldPresentInRequest = (
  reqData: Record<string, any>,
  field: string
) => {
  try {
    return (
      reqData.hasOwnProperty(field) &&
      reqData[field] !== null &&
      reqData[field] !== undefined &&
      reqData[field] !== ""
    );
  } catch (error) {
    console.log(`Error while checking fields in the reqdata: ${error}`);
    return false;
  }
};

export const checkRequiredFieldsPresentInReqdata = (
  requiredFields: string[],
  reqData: Record<string, any>,
  extraFunction?: () => void
) => {
  try {
    const invalidFields: string[] = [];

    requiredFields.forEach((field) => {
      if (!isFieldPresentInRequest(reqData, field)) invalidFields.push(field);
    });
    if (invalidFields.length > 0) {
      extraFunction && extraFunction();
      throw new ErrorHandler(
        `Fields that are missing in reqBody: ${invalidFields.join(", ")}`,
        400
      );
    }
  } catch (error) {
    throw error;
  }
};

export const deletePhotoByPath = (path: string, message?: string): void => {
  rm(path, () => console.log(message || "Photo deleted!"));
};
