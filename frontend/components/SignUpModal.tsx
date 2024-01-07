import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";
import toast from "react-hot-toast";

import Modal from "./Modal";
import Button from "./Button";

import useUser from "@/utils/useUser";
import { SignUpCredentials } from "@/fetchApi/users.api";
import * as UsersApi from "@/fetchApi/users.api";

const SignUpModal = () => {
  const userState = useUser();
  const router = useRouter();

  // Modal OnChange
  const ModalOnChange = () => {
    userState.close();
    reset;
    router.refresh();
  };

  // Form Submit
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpCredentials>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpCredentials> = async (
    newUser: SignUpCredentials
  ) => {
    try {
      await UsersApi.signup(newUser);
      if (isSubmitSuccessful) {
        toast.success("Sign Up Successfully");
        ModalOnChange();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  // Password Visible
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordText, setPasswordText] = useState<string>("");
  const switchVisibleState = () => {
    setPasswordVisible(!passwordVisible);
  };
  const { onChange: onPasswordChange, ...rest } = register("password", {
    required: "Required",
  });
  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 爲了不讓 register 的 onChange 與我們的 onChange 衝突,
    // 從而導致輸入值后依然會視爲未輸入，顯示警告訊息，
    // 所以這裏要特別從 register 中取出 onChange，並同步輸入值
    onPasswordChange(e);
    setPasswordText(e.target.value);
  };

  // Visible Icon
  const VisibleIcon = passwordVisible ? AiFillEyeInvisible : MdVisibility;

  interface ErrosType {
    errorsTarget: FieldErrors<SignUpCredentials> | undefined;
  }

  // Warning Icon
  const WarningIcon: React.FC<ErrosType> = ({ errorsTarget }) => {
    return (
      <PiWarningCircleLight
        color="red"
        size={22}
        className={`
          absolute
          right-2
          translate-y-[-50%]
          top-1/2
          ${errorsTarget ? "flex" : "hidden"}
        `}
      />
    );
  };

  // Warning Message
  const WarningErrorMessage = ({
    errorsMessage,
  }: {
    errorsMessage: string;
  }) => {
    return (
      <div
        className={`
        ${errorsMessage ? "flex" : "hidden"}
      `}
      >
        <p
          className="
            text-sm
          text-red-500
          "
        >
          {errorsMessage}
        </p>
      </div>
    );
  };

  return (
    <Modal isOpen={userState.isSignUp} onChange={ModalOnChange} title="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="
            flex
            flex-col
            p-[20px]
            pt-0
            gap-y-4
            border-b
            border-neutral-200/50    
          "
        >
          {/* Username */}
          <div
            className="
              flex
              flex-col
              gap-y-2
            "
          >
            {/* Username title */}
            <p className="text-md font-medium">Username</p>

            {/* Username Form && Warning Icon */}
            <div className="flex relative">
              {/* Username Form */}
              <input
                id="username"
                type="text"
                placeholder="Username"
                maxLength={25}
                {...register("username", { required: "Required" })}
                className={`
                  flex
                  w-full
                  px-3
                  py-2.5
                  border-1
                  outline-none
                  rounded-md
                  shadow-[1px_1px_6px_1px_rgba(0,0,0,0)]
                  focus:placeholder:text-transparent
                  text-medium
                  ${
                    errors.username
                      ? `
                        border-red-200 
                        shadow-red-200
                        `
                      : `
                        focus:border-blue-200
                        focus:shadow-blue-200
                        `
                  }
                `}
              />

              {/* Username Warning Icon */}
              <WarningIcon errorsTarget={errors.username} />
            </div>

            {/* Username Error Message */}
            <WarningErrorMessage
              errorsMessage={errors.username?.message || ""}
            />
          </div>

          {/* Email */}
          <div
            className="
              flex
              flex-col
              gap-y-2
            "
          >
            {/* Email Title */}
            <p className="text-md font-medium">Email</p>

            {/* Email Form && Warning Icon */}
            <div className="flex relative">
              {/* Email Form */}
              <input
                id="email"
                type="text"
                placeholder="example123@gmail.com"
                maxLength={25}
                {...register("email", { required: "Required" })}
                className={`
                  flex
                  w-full
                  px-3
                  py-2.5
                  border-1
                  outline-none
                  rounded-md
                  shadow-[1px_1px_6px_1px_rgba(0,0,0,0)]
                  focus:placeholder:text-transparent
                  text-medium
                  ${
                    errors.email
                      ? `
                        border-red-200 
                        shadow-red-200
                        `
                      : `
                        focus:border-blue-200
                        focus:shadow-blue-200
                        `
                  }
                `}
              />
              {/* Email Warning Icon */}
              <WarningIcon errorsTarget={errors.email} />
            </div>

            {/* Email Error Message */}
            <WarningErrorMessage errorsMessage={errors.email?.message || ""} />
          </div>

          {/* Password */}
          <div
            className="
              flex
              flex-col
              gap-y-2
            "
          >
            {/* Password Title */}
            <p className="text-md font-medium">Password</p>

            {/* Password Form && Warning Icon*/}
            <div className="flex relative">
              {/* Password Form */}
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                maxLength={30}
                {...rest}
                onChange={passwordOnChange}
                className={`
                  flex
                  w-full
                  px-3
                  py-2.5
                  border-1
                  outline-none
                  rounded-md
                  shadow-[1px_1px_6px_1px_rgba(0,0,0,0)]
                  focus:placeholder:text-transparent
                  text-medium
                  ${
                    errors.password
                      ? `
                        border-red-200 
                        shadow-red-200
                        `
                      : `
                        focus:border-blue-200
                        focus:shadow-blue-200
                        `
                  }
                `}
              />

              {/* Password Warning Icon */}
              <WarningIcon errorsTarget={errors.password} />

              {/* Password Visible Icon */}
              <VisibleIcon
                size={20}
                onClick={switchVisibleState}
                className={`
                  ${passwordText.length > 0 ? "flex" : "hidden"}
                  absolute
                  translate-y-[-50%]
                  top-1/2
                  right-3
                  text-neutral-400
                  hover:text-black
                  cursor-pointer
                  transition
                `}
              />
            </div>

            {/* Password Error Message */}
            <WarningErrorMessage
              errorsMessage={errors.password?.message || ""}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div
          className="
            flex-block
            py-4
            px-[20px]
          "
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              px-3
              py-2
              rounded-lg
              text-white
            "
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SignUpModal;
