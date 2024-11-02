export class AuthRepository {
  async getUserByEmail(email: string) {
    console.log({ email });
    return true;
  }

  async SignUpWithEmailAndPassword(email: string) {
    console.log({ email });
    return true;
  }
}
