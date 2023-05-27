import { UserRole } from "@/src/constants/constaints";

export class LoginDataModel {
  id: Number = 0;
  email: string = "";
  role: string = "";
  username: string = "";
  isValidAdmin: boolean = false;

  constructor(data: LoginDataModel) {
    if (data) {
      this.id = data?.id;
      this.email = data?.email;
      this.role = data?.role;
      this.username = data?.username;
      this.isValidAdmin = this.role === UserRole.admin
    }
  }
}
