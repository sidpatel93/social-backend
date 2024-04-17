import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { JoiValidation } from "../../../shared/global/decorators/joiValidation.decoratror";
import { signupSchema } from "../schemes/signup";
import { authService } from "src/shared/services/db/auth.service";
import { BadRequestError } from "src/shared/global/helpers/errorHandler";
import { Helpers } from "src/shared/global/helpers/helpers";
import { IAuthDocument, ISignUpData } from "../interfaces/auth.interface";
import { UploadApiResponse } from "cloudinary";
import { uploads } from "src/shared/global/helpers/cloudinaryUploader";

export class SignUp {
  @JoiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarColor, avatarImage } = req.body;
    const checkIfUserExists = await authService.getUserByUsernameOrEmail(
      username,
      email
    );
    if (checkIfUserExists) {
      throw new BadRequestError("User already exists");
    }
    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = Helpers.generateRandomIntegers(12).toString();
    const authData: IAuthDocument = SignUp.prototype.signUpData({
      _id: authObjectId,
      uId,
      email,
      username,
      password,
      avatarColor,
    } as ISignUpData);
    const result: UploadApiResponse = (await uploads(
      avatarImage,
      `${userObjectId}`,
      true,
      true
    )) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError("Error uploading image");
    }
  }

  private signUpData(data: ISignUpData): IAuthDocument {
    const { _id, uId, email, username, password, avatarColor } = data;
    return {
      _id,
      uId,
      email: Helpers.lowercase(email),
      username: Helpers.firstLetterUppercase(username),
      password,
      avatarColor,
      createdAt: new Date(),
    } as IAuthDocument;
  }
}
