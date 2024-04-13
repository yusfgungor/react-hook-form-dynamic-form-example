"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { QuestionFormField } from "./_components/QuestionFormField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  questions: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required("This field is required"),
      })
    )
    .required(),
});

type Question = { text: string };

type Inputs = {
  questions: Array<Question>;
};

const questionDefaultValue: Question = { text: "" };

export default function Home() {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: { questions: [] },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  function addNewQuestion() {
    append(questionDefaultValue);
  }

  function removeQuestion(questionIndex: number) {
    remove(questionIndex);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add Your Questions
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((question, index) => (
            <QuestionFormField
              key={question.id}
              control={control}
              index={index}
              removeQuestion={removeQuestion}
            />
          ))}

          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={addNewQuestion}
            >
              + Add New Question
            </button>
            <hr className="my-2" />
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
