import { createFileRoute } from "@tanstack/react-router";

import data from "../data/dynamic-form-input.json";

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

  return (
    <div className="p-2 flex flex-col gap-2">
      {data.map((control) => {
        // Radio
        if (control.type === "radio") {
          return (
            <fieldset className="flex flex-col" key={control.id}>
              <legend>{control.label}</legend>
              {control.options?.map((option) => {
                return (
                  <div key={option.value}>
                    <input
                      type="radio"
                      id={control.id + option.value}
                      name={control.id}
                      value={option.value}
                    ></input>
                    <label htmlFor={control.id + option.value}>
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </fieldset>
          );

          // Checkbox
        } else if (control.type === "checkbox") {
          return (
            <fieldset key={control.id}>
              <legend>{control.label}</legend>

              {control.options?.map((option) => {
                return (
                  <div key={option.value}>
                    <input
                      type="checkbox"
                      id={control.id + option.value}
                      name={control.id}
                    />
                    <label htmlFor={control.id + option.value}>
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </fieldset>
          );
        } else if (control.type === "select") {
          return (
            <div className="flex flex-col" key={control.id}>
              <label htmlFor={control.id}>{control.label}</label>
              <select className="input" id={control.id}>
                {control.options?.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          );
        }

        // Text / email / number
        return (
          <div className="flex flex-col" key={control.id}>
            <label htmlFor={control.id}>{control.label}</label>
            <input
              className="input"
              type={control.type}
              id={control.id}
              placeholder={control.placeholder}
            />
          </div>
        );
      })}
    </div>
  );
}
