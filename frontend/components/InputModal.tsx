import { useRouter } from 'next/navigation';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';

import Modal from './Modal';
import Button from './Button';

import useInputModal from '@/utils/useInputModal';

const InputModal = () => {
  const inputModal = useInputModal();
  const router = useRouter();
  const onChange = () => {
    inputModal.close();
    // router.refresh();
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    try {
      console.log(value);
    } catch (error) {
      console.log(error);
      alert(error);
    }

    // inputModal.close();
    // reset();
  };

  return (
    <Modal isOpen={inputModal.isOpen} onChange={onChange} title="Add Note">
      {/* Form */}
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
          {/* Title */}
          <div
            className="
              flex
              flex-col
              gap-y-2
            "
          >
            <p className="text-md font-medium">Title</p>
            <input
              id="title"
              type="text"
              placeholder="Title"
              maxLength={25}
              {...register('title', { required: true })}
              className="
                flex
                w-full
                py-2.5
                px-3
                border
                rounded-md
                focus:outline-blue-100
                focus:placeholder:text-transparent
                text-md
              "
            />
          </div>

          {/* Content */}
          <div
            className="
              flex
              flex-col
              gap-y-2
            "
          >
            <p className="text-md font-medium">Content</p>
            <textarea
              id="content"
              placeholder="Content"
              {...register('content', { required: true })}
              className="
                flex
                w-full
                min-h-[200px]
                max-h-[400px]
                py-2
                px-3
                border
                rounded-md
                focus:outline-blue-100
                whitespace-pre-wrap
                text-md
              "
            />
          </div>
        </div>

        {/* Button */}
        <div
          className="
            flex
            justify-end
            py-2
            px-[20px]
          "
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
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

export default InputModal;
