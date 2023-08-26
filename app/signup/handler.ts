"use server";

import pb from "@/helpers/pocketbase";

export async function signupHandler(data: FormData) {
  "use server";

  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const formAvatar = data.get("avatar");

  const userObj = {
    name,
    email,
    password,
    passwordConfirm: password,
  };

  // If the avatar size is greater than 0, add it to the object
  if (((formAvatar as File)?.size || 0) > 0) {
    userObj.avatar = formAvatar;
  }

  const newUser = await pb.collection("users").create(userObj);

  return { success: !!newUser };
}
