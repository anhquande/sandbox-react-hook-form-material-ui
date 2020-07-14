import React from "react";
import {Controller, FormContext, useFieldArray, useForm, useFormContext} from "./src";
import {DevTool} from "react-hook-form-devtools";
import ReactDOM from "react-dom";
import {createMuiTheme, MenuItem, Select, TextField, ThemeProvider} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import "./styles.css";

let renderCount = 0;

function App() {
  const methods = useForm({
    defaultValues: {
      test: [
        {id: 1, salutation: 1, name: "Alex"},
        {id: 2, salutation: 2, name: "Barbara"},
        {id: 3, salutation: 3, name: "Candy"}
      ]
    }
  });
  const {handleSubmit} = methods;
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
      <DevTool control={methods.control}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Field Array </h1>
        <p>The following demo allow you to delete, append, prepend items</p>
        <span className="counter">Render Count: {renderCount}</span>
        <FormContext {...methods}>
          <Fields/>
        </FormContext>
        <input type="submit"/>
      </form>
    </ThemeProvider>
  );
}

function SalutationPicker({value, onChange, onBlur}) {
  return (
    <Select value={value} onChange={onChange} onBlur={onBlur}>
      <MenuItem key="1" value={1}>
        Mr.
      </MenuItem>
      <MenuItem key="2" value={2}>
        Mrs.
      </MenuItem>
      <MenuItem key="3" value={3}>
        Ms.
      </MenuItem>
    </Select>
  );
}


const NameField = ({name, control}) => {
  return (
    <Controller name={name}
                control={control}
                as={({onChange, onBlur, value}) => (
                  <TextField value={value} onChange={onChange} onBlur={onBlur}/>
                )}/>
  )
}

const SalutationField = ({name, control}) => {
  return (
    <Controller name={name}
                control={control}
                as={({onChange, onBlur, value}) => (
                  <SalutationPicker value={value} onChange={onChange} onBlur={onBlur}/>
                )}/>
  )
}

function Fields() {
  const {control, formState} = useFormContext();
  const {fields, append, remove} = useFieldArray({
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
              <SalutationField name={`test[${index}].salutation`} control={control}/>
              <NameField name={`test[${index}].name`} control={control}/>

              <IconButton onClick={() => remove(index)}>
                <DeleteIcon/>
              </IconButton>
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append([{salutation: 2, name: "New girl"}]);
          }}
        >
          append
        </button>
      </section>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
