import React from "react";
import {
  useForm,
  FormContext,
  useFormContext,
  Controller,
  useFieldArray
} from "./src";
import { DevTool } from "react-hook-form-devtools";
import ReactDOM from "react-dom";
import {
  Select,
  MenuItem,
  TextField,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import "./styles.css";

let renderCount = 0;

function App() {
  const methods = useForm({
    defaultValues: {
      test: [
        { salutation: "Mr.", name: "Alex" },
        { salutation: "Mrs.", name: "Barbara" },
        { salutation: "Ms.", name: "Candy" }
      ]
    }
  });
  const { handleSubmit } = methods;
  console.log(methods.formState.dirty);

  const onSubmit = data => console.log("data", data);

  renderCount++;

  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <DevTool control={methods.control} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Field Array </h1>
        <p>The following demo allow you to delete, append, prepend items</p>
        <span className="counter">Render Count: {renderCount}</span>
        <FormContext {...methods}>
          <Fields />
        </FormContext>
        <input type="submit" />
      </form>
    </ThemeProvider>
  );
}

function MySelect({ value }) {
  return (
    <Select value={value}>
      <MenuItem key="1" value="Mr.">
        option 1
      </MenuItem>
      <MenuItem key="2" value="Mrs.">
        option 2
      </MenuItem>
      <MenuItem key="3" value="Ms.">
        option 3
      </MenuItem>
    </Select>
  );
}

function Fields() {
  const { control, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });

  console.log("dirty", formState.dirty);
  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <Controller as={<MySelect />} name={`test[${index}].option`} />
              <Controller as={<TextField />} name={`test[${index}].name`} />
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: "append" });
          }}
        >
          append
        </button>
      </section>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
