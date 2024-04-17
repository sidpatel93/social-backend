import { IAuthDocument } from "src/features/auth/interfaces/auth.interface";
import { AuthModel } from "src/features/auth/models/auth.schema";
import { Helpers } from "src/shared/global/helpers/helpers";

class AuthService {
  public async getUserByUsernameOrEmail(
    username: string,
    email: string
  ): Promise<IAuthDocument> {
    const query = {
      $or: [
        { username: Helpers.firstLetterUppercase(username) },
        { email: Helpers.lowercase(email) },
      ],
    };
    const user = (await AuthModel.findOne(query).exec()) as IAuthDocument;
    return user;
  }
}

export const authService = new AuthService();
