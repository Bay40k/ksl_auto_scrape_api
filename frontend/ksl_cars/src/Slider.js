import React from "react";
import { Slider as MuiSlider, Typography, TextField, Box } from "@mui/material";

export default function Slider({
  label,
  value,
  onChange,
  min,
  max,
  minLabel,
  maxLabel,
}) {
  return (
    <>
      <Typography>{label}</Typography>
      <MuiSlider
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={{ width: "100%" }}
      />
      <Box sx={{ display: "flex" }}>
        <TextField
          label={minLabel || label + " From"}
          value={value?.[0]}
          onChange={(e) => onChange([e.target.value, value[1]])}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label={maxLabel || label + " To"}
          value={value?.[1]}
          onChange={(e) => onChange([value[0], e.target.value])}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Box>
    </>
  );
}
