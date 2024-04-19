"use server";

import { user } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { validateSession } from "@/lib/lucia";
import { createUserSession } from "@/lib/services/auth-service";
import {
  sendNewVerificationEmail,
  sendPasswordWasResetEmail,
} from "@/lib/services/email-service";
import {
  EditAccountSchema,
  ResetPasswordSchemaStep2,
} from "@/types/user-schema";

export const getUser = async (
  identifier: { email: string } | { username: string } | { userId: string },
) => {
  const dbUser = await db.user.findUnique({
    where:
      "email" in identifier
        ? { email: identifier.email }
        : "username" in identifier
          ? { username: identifier.username }
          : { id: identifier.userId },
    select:
      "username" in identifier
        ? {
            id: true,
            display_name: true,
            username: true,
            first_name: true,
            last_name: true,
            email: true,
            isEmailVerified: true,
            image: true,
            role: true,
            bio: true,
            theme: true,
          }
        : undefined,
  });
  if (!dbUser) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    user: dbUser,
  };
};

export const getFakeUser = async () => {
  const randomNum = Math.floor(Math.random() * 10000);
  const user = {
    id: `userId-${randomNum}`,
    display_name: `User-${randomNum}`,
    username: `user-${randomNum}`,
    role: "user",
  };

  return user;
};

export const getAllUsers = async () => {
  const dbUser = await db.user.findMany();
  if (!dbUser) {
    return {
      success: false,
      message: "No users found",
    };
  }

  return dbUser;
};

// TODO: implement user socials
// export const getUserSocials = async (id: string) => {
//   const dbUser = await getUser({userId: id});

//   const dbSocials = await db.socials.findMany({
//     where: { userId: dbUser.id },
//   });

//   return dbSocials;
// };

export const updateUser = async (values: Partial<user>) => {
  const { user } = await getUser({ userId: values.id! });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  let hashedPassword: string;
  hashedPassword = user.password;

  const validData = {
    display_name: values.display_name,
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    isEmailVerified: values.isEmailVerified,
    password: hashedPassword,
    image: values.image,
    role: values.role,
    bio: values.bio,
    theme: values.theme,
  };

  const dbUser = await db.user.update({
    where: { id: user.id },
    data: { ...validData },
  });
  if (!dbUser) {
    return {
      success: false,
      message: "There was an error updating the user.",
      description: "Please try again later.",
    };
  }

  if (values.isEmailVerified === false && values.email !== user.email) {
    await sendNewVerificationEmail(dbUser.email);
  }

  revalidatePath(`/u/${dbUser.username}`);
  revalidatePath(`/${dbUser.username}`);

  return {
    success: true,
    data: dbUser,
  };
};

// TODO: Add to sign up process
export const isUsernameAvailable = async (username: string) => {
  const dbUser = await getUser({ username });

  if (!dbUser) {
    return {
      success: false,
      message: "Username is already taken",
    };
  }
};

export const validatePassword = async (userId: string, password: string) => {
  const { user } = await getUser({ userId });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    return {
      success: false,
      message: "Password is invalid",
    };
  }

  return {
    success: true,
  };
};

export const changePassword = async (
  values: z.infer<typeof EditAccountSchema>,
) => {
  try {
    try {
      EditAccountSchema.parse(values);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }

    const { user } = await validateSession();
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const dbUser = await getUser({ userId: user.id });
    if (!dbUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const isValidPassword = await validatePassword(
      user.id,
      values.oldPassword!,
    );
    if (!isValidPassword.success) {
      return {
        success: false,
        message: "Old password is invalid",
      };
    }

    await updateUser({
      id: user.id,
      password: values.newPassword,
    });

    if (values.logoutFromOtherDevices === true) {
      await db.session.deleteMany({
        where: { userId: user.id },
      });

      await createUserSession(user.id);
    }

    return {
      success: true,
      message: "Password updated.",
      description:
        values.logoutFromOtherDevices === true &&
        "All other devices have been logged out.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchemaStep2>,
  email: string,
) => {
  try {
    try {
      ResetPasswordSchemaStep2.parse(values);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }

    const { user } = await getUser({ email });
    if (!user) {
      return {
        success: false,
        message: "No account with that email found",
      };
    }

    const hashedPassword = await hash(values.newPassword, 12);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (values.logoutFromOtherDevices === true) {
      await db.session.deleteMany({
        where: { userId: user.id },
      });
    }

    await createUserSession(user.id);

    await sendPasswordWasResetEmail(email);

    return {
      success: true,
      message: "Password reset",
      description:
        values.logoutFromOtherDevices &&
        "All other devices have been logged out.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const validateResetPasswordCode = async (
  code: string,
  email: string,
) => {
  const resetPasswordQueryResult = await db.resetPassword.findFirst({
    where: {
      code,
      userEmail: email,
    },
  });
  if (!resetPasswordQueryResult) {
    return {
      success: false,
      message: "Invalid token",
    };
  }

  return {
    success: true,
  };
};

export const isEmailVerified = async (email: string) => {
  try {
    const { user } = await getUser({ email });
    if (!user) {
      return {
        error: "Account not found",
      };
    }

    if (user.isEmailVerified === false) {
      return {
        error: "Email not verified",
        key: "email_not_verified",
      };
    }

    if (user.isEmailVerified === true) {
      return {
        success: "Email is already verified",
      };
    }

    return {
      success: "Email verified",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Modify error handling
export const getSelf = async ({ username }: { username?: string }) => {
  const { user } = await validateSession();
  const self = user;
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const dbUser = await db.user.findUnique({
    where: username ? { username } : { id: self.id },
  });
  if (!dbUser) {
    throw new Error("User not found");
  }

  if (self.username !== dbUser.username) {
    throw new Error("Unauthorized");
  }

  return dbUser;
};
