import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { JoiValidation } from "../../../shared/global/decorators/joiValidation.decoratror";
import { signupSchema } from "../schemes/signup";
import { authService } from "src/shared/services/db/auth.service";

export class SignUp {
  @JoiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarColor, avatarImage } = req.body;
    const checkIfUserExists = await authService.getUserByUsernameOrEmail(
      username,
      email
    );
  }
}
