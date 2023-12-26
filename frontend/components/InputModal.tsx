/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { PiWarningCircleLight } from 'react-icons/pi';
import { useForm, SubmitHandler } from 'react-hook-form';

import Button from './Button';
import Modal from './Modal';

import useNotes from '@/utils/useNotes';
import useInputModal from '@/utils/useInputModal';
import * as NotesApi from '@/fetchApi/notes.api';
import { NoteInput } from '@/fetchApi/notes.api';
import useOptionModal from '@/utils/useOptionModal';

const InputModal = () => {
  const inputModal = useInputModal();
  const router = useRouter();
  const { setNotes, notes, setNoteIdCollapsed, noteIdCollapsed } = useNotes();
  const {
    setNoteIdOptions,
    noteIdActivedOptions,
    editModalOpenState,
    EditModalReset,
  } = useOptionModal();

  const title = editModalOpenState?.isEdited ? 'Edit Note' : 'Add Note';

  // Edit Title and Content State
  const [editTitle, setEditTitle] = useState<string | undefined>(
    editModalOpenState?.note?.title
  );
  const [editContent, setEditContent] = useState<string | undefined>(
    editModalOpenState?.note?.content
  );

  const {
    register,
    handleSubmit,
    reset: FormReset,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<NoteInput>({
    defaultValues: {
      title: editTitle || '',
      content: editContent || '',
    },
  });

  const modalOnChange = () => {
    inputModal.close();
    EditModalReset();
  };
  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
    setValue('title', e.target.value);
  };
  const contentOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
    setValue('content', e.target.value);
  };

  const onSubmit: SubmitHandler<NoteInput> = async (newNote: NoteInput) => {
    try {
      if (editModalOpenState?.isEdited && editModalOpenState.note) {
        const noteResponse = await NotesApi.updateNote(
          editModalOpenState.note?._id,
          {
            ...editModalOpenState.note,
            title: newNote.title || '',
            content: newNote.content || '',
          }
        );
        setNotes(
          notes.map((note) =>
            note._id === noteResponse._id ? noteResponse : note
          )
        );

        toast.success('Note updated successfully');
      } else {
        const noteResponse = await NotesApi.createNote(newNote);

        setNoteIdCollapsed([
          ...noteIdCollapsed,
          { _id: noteResponse._id, collapsed: false },
        ]);
        setNotes([...notes, noteResponse]);
        setNoteIdOptions([
          ...noteIdActivedOptions,
          { _id: noteResponse._id, activedOptions: false },
        ]);

        toast.success('Note created successfully');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      inputModal.close();
      EditModalReset();
      FormReset();
      router.refresh();
    }
  }, [isSubmitted]);

  useEffect(() => {
    setEditTitle(editModalOpenState?.note?.title || '');
    setEditContent(editModalOpenState?.note?.content || '');
    setValue('title', editModalOpenState?.note?.title || '');
    setValue('content', editModalOpenState?.note?.content || '');
  }, [editModalOpenState?.isEdited]);

  return (
    <Modal isOpen={inputModal.isOpen} onChange={modalOnChange} title={title}>
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
                {...register('title', { required: 'Required' })}
                value={editTitle}
                onChange={titleOnChange}
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
                    editModalOpenState?.isEdited &&
                    'text-neutral-400 focus:text-black'
                  }
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
                  ${errors.title ? 'flex' : 'hidden'}
                `}
              />
            </div>
            {/* Error */}
            <div
              className={`
                ${errors.title ? 'flex' : 'hidden'}
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
              {...register('content', { required: false })}
              value={editContent}
              onChange={contentOnChange}
              className={`
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
                text-medium
                ${
                  editModalOpenState?.isEdited &&
                  'text-neutral-400 focus:text-black'
                }
              `}
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
