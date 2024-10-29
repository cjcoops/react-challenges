import { createFileRoute } from "@tanstack/react-router";

import data from "../data/dynamic-form-input.json";
import { useState } from "react";

export const Route = createFileRoute("/dynamic-form")({
  component: DynamicForm,
});

/*
1. Simple <input> with label, placeholder, id
2. Email/number
3. Radio
4. Checkbox
5. Select
6. Textarea
6. Required validation
7. Other validation
8. Form submission
9. Output to JSON
*/

function DynamicForm() {
  console.log(data);

  const [formState, setFormState] = useState<Record<string, any>>({});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  const handleChange = (id: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [id]: value }));
  };

  function renderField(control: (typeof data)[number]) {
    switch (control.type) {
      case "radio":
        return (
          <fieldset className="flex flex-col">
            <legend>{control.label}</legend>
            {control.options?.map((option) => {
              return (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={control.id + option.value}
                    name={control.id}
                    value={option.value}
                    onChange={() => handleChange(control.id, option.value)}
                    required={control.required}
                  ></input>
                  <label htmlFor={control.id + option.value}>
                    {option.label}
                  </label>
                </div>
              );
            })}
          </fieldset>
        );
      case "checkbox":
        return (
          <fieldset>
            <legend>{control.label}</legend>

            {control.options?.map((option) => {
              return (
                <div key={option.value}>
                  <input
                    type="checkbox"
                    id={control.id + option.value}
                    name={control.id}
                    onChange={(e) => {
                      const currentValues = formState[control.id] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(
                            (val: string) => val !== option.value
                          );
                      handleChange(control.id, newValues);
                    }}
                    required={control.required}
                  />
                  <label htmlFor={control.id + option.value}>
                    {option.label}
                  </label>
                </div>
              );
            })}
          </fieldset>
        );
      case "select":
        return (
          <div className="flex flex-col">
            <label htmlFor={control.id}>{control.label}</label>
            <select
              className="input"
              id={control.id}
              onChange={(e) => handleChange(control.id, e.target.value)}
              required={control.required}
            >
              <option value="">---</option>
              {control.options?.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case "textarea":
        return (
          <div className="flex flex-col">
            <label htmlFor={control.id}>{control.label}</label>
            <textarea
              className="input"
              id={control.id}
              required={control.required}
              placeholder={control.placeholder}
              onChange={(e) => handleChange(control.id, e.target.value)}
            />
          </div>
        );

      case "text":
      case "email":
      case "number":
        return (
          <div className="flex flex-col">
            <label htmlFor={control.id}>{control.label}</label>
            <input
              className="input"
              type={control.type}
              id={control.id}
              required={control.required}
              placeholder={control.placeholder}
              onChange={(e) => handleChange(control.id, e.target.value)}
            />
          </div>
        );

      default:
        break;
    }
  }

  return (
    <form className="p-2 flex flex-col gap-2" onSubmit={handleSubmit}>
      {data.map((control) => (
        <div key={control.id}>{renderField(control)}</div>
      ))}
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
