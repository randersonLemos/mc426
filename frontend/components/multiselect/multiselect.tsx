import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FilledInput,
  OutlinedInput,
  Input,
} from "@mui/material";

interface MultipleSelectProps {
  names: string[];
  variant?: "filled" | "standard" | "outlined";
  fullWidth?: boolean;
  size?: "medium" | "small";
  width?: number;
}

export default function MultipleSelect({
  names,
  variant,
  fullWidth,
  size,
  width,
}: MultipleSelectProps) {
  return (
    <div>
      <FormControl
        sx={{ width }}
        variant={variant ? variant : "standard"}
        fullWidth={fullWidth}
        size={size}
      >
        <InputLabel id="recipientNames">Destinatários</InputLabel>
        <Select
          id="recipients"
          labelId="recipientNames"
          multiple
          value={names}
          input={
            variant === "filled" ? (
              <FilledInput />
            ) : variant === "outlined" ? (
              <OutlinedInput />
            ) : (
              <Input />
            )
          }
        >
          <MenuItem value=""> Selecione os destinatários pela tabela</MenuItem>
          {names.map((name, index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
