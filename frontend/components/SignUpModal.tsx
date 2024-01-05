import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';

import Modal from './Modal';

import useUser from '@/utils/useUser';
import { SignUpCredentials } from '@/fetchApi/users.api';

const SignUpModal = () => {
  const userState = useUser();
  const router = useRouter();

  // Modal OnChange
  const onChange = () => {
    userState.close();
    router.refresh();
  };

  // Form Submit
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpCredentials>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpCredentials> = async (
    newUser: SignUpCredentials
  ) => {
    try {
      console.log(newUser);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  // Password Visible
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordText, setPasswordText] = useState<string>('');
  const handleCheckboxOnChange = () => {
    setPasswordVisible(!passwordVisible);
  };
  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordText(e.target.value);
  };

  // Visible Icon
  const VisibleIcon = passwordVisible ? AiFillEyeInvisible : MdVisibility;

  return (
    <Modal isOpen={userState.isSignUp} onChange={onChange} title="Sign Up">
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
            <p className="text-md font-medium">Username</p>
            <div className="flex relative">
              <input
                id="username"
                type="text"
                placeholder="Username"
                maxLength={25}
                {...register('username', { required: 'Required' })}
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
            </div>
          </div>

          {/* Email */}
          <div
            className="
              flex
              flex-col
              gap-y-2
            "
          >
            <p className="text-md font-medium">Email</p>
            <div className="flex relative">
              <input
                id="email"
                type="text"
                placeholder="example123@gmail.com"
                maxLength={25}
                {...register('email', { required: 'Required' })}
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
            </div>
          </div>

          {/* Password */}
          <div
            className="
              flex
              flex-col
              gap-y-2
            "
          >
            {/* Title */}
            <p className="text-md font-medium">Password</p>

            {/* Form */}
            <div className="flex relative">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                maxLength={30}
                {...register('password', { required: 'Required' })}
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
              {/* Visible Icon */}
              <VisibleIcon
                size={20}
                onClick={handleCheckboxOnChange}
                className={`
                  ${passwordText.length > 0 ? 'flex' : 'hidden'}
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
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SignUpModal;
