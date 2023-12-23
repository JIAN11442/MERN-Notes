import { toast } from "react-hot-toast";
import { PiWarningCircleLight } from "react-icons/pi";
import { useForm, SubmitHandler } from "react-hook-form";

import Modal from "./Modal";
import Button from "./Button";

import useNotes from "@/utils/useNotes";
import useInputModal from "@/utils/useInputModal";
import * as NotesApi from "@/fetchApi/notes.api";
import { NoteInput } from "@/fetchApi/notes.api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const InputModal = () => {
  const inputModal = useInputModal();
  const router = useRouter();
  const { setNotes, notes, setNoteIdCollapsed, noteIdCollapsed } = useNotes();
  const onChange = () => {
    inputModal.close();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NoteInput>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<NoteInput> = async (newNote: NoteInput) => {
    try {
      const noteResponse = await NotesApi.createNote(newNote);
      console.log(noteResponse);
      setNoteIdCollapsed([
        ...noteIdCollapsed,
        { _id: noteResponse._id, collapsed: false },
      ]);
      setNotes([...notes, noteResponse]);

      toast.success("Note created successfully");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      inputModal.close();
      router.refresh();
    }
  }, [isSubmitSuccessful]);

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
            <div className="flex relative">
              <input
                id="title"
                type="text"
                placeholder="Title"
                maxLength={25}
                {...register("title", { required: "Required" })}
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
                text-md
                ${
                  errors.title
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
              {/* Warning */}
              <PiWarningCircleLight
                color="red"
                size={22}
                className={`
                  absolute
                  right-2
                  translate-y-[-50%]
                  top-1/2
                  ${errors.title ? "flex" : "hidden"}
                `}
              />
            </div>
            {/* Error */}
            <div
              className={`
                flex
                ${errors.title ? "flex" : "hidden"}
            `}
            >
              <p
                className="
                  text-sm
                text-red-500
                "
              >
                {errors?.title?.message}
              </p>
            </div>
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
              {...register("content", { required: false })}
              className="
                flex
                w-full
                min-h-[200px]
                max-h-[400px]
                py-2
                px-3
                outline-none
                border-1
                rounded-md
                shadow-[1px_1px_6px_1px_rgba(0,0,0,0)]
                focus:border-blue-100
                focus:shadow-blue-200
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
