import UseFetchHook from "@/lib/config/axios.config";
import {
  // UserAuthRequestType,
  // SignupAuthType,
  CommonResponseType,
  SignupResponseType,
  SigninResponseType,
} from "@/types/users.type";

class AuthService {
  public async signup(
    body: any
  ): Promise<CommonResponseType<SignupResponseType>> {
    return UseFetchHook(
      `/api/${process.env.NEXT_PUBLIC_API_VERSION}/auth/tenant/signup`,
      "POST",
      {
        body,
      }
    );
  }
  public async signin(
    body: any
  ): Promise<CommonResponseType<SigninResponseType>> {
    return UseFetchHook(
      `/api/${process.env.NEXT_PUBLIC_API_VERSION}/auth/login`,
      "POST",
      {
        body,
      }
    );
  }
}

export default AuthService;
