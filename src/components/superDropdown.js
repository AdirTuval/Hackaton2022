import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SuperDropdown({ supermarket, setSupermarket }) {
  const handleChange = (event) => {
    setSupermarket(event.target.value);
    console.log("Dropdown: " + supermarket);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 200, mr: "auto", ml: "auto" }}>
      <FormControl fullWidth>
        <InputLabel id="super-dropdown">Supermarket</InputLabel>
        <Select
          labelId="super-dropdown"
          id="super-dropdown-select"
          value={supermarket}
          label="Supermarket"
          onChange={handleChange}
        >
          <MenuItem value={"Ten"}>Shufersal Agron</MenuItem>
          <MenuItem value={"Twenty"}>Rami Levy Talpiot</MenuItem>
          <MenuItem value={"Thirty"}>Zol U'begadol Nayot</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
