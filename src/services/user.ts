import { createHmac, randomBytes } from "node:crypto"
import prisma from "../lib/prismadb"

export interface CreateUserPayload {
  firstName: string
  lastName?: string
  profileImageURL?: string
  email: string
  password: string
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hash = createHmac("sha256", salt).update(password).digest("hex")

    return hash
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, profileImageURL, email, password } = payload
    const salt = randomBytes(35).toString()
    const hashedPassword = UserService.generateHash(salt, password)

    return prisma.user.create({
      data: {
        firstName,
        lastName,
        profileImageURL,
        email,
        password: hashedPassword,
        salt,
      },
    })
  }
}

export default UserService
