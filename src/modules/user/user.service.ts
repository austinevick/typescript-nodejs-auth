import { User, UserModel } from "./user.model";

export async function createUser(user: Omit<User, 'comparePassword'>) {
    return await UserModel.create(user);
}

export async function findUserByEmail(email: User['email']) {
    return UserModel.findOne({ email })
}

export async function findUserAndOmitPwd(email: string) {
    return await UserModel.findOne({ email: email }).select('-password')

}