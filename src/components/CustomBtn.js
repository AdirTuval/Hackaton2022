import React from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const StyledButton = withStyles({
    root: {
        margin: 'auto',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
        borderRadius: 10.5,
        background: "#470570",
        color: "#F4DEE7",
        transform: "none",
        transition: "background .3s,border-color .3s,color .3s",
        "&:hover": {
            backgroundColor:  "#4f25f7"
          },
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  export default function CustomBtn(props) {
    return (
        <StyledButton variant="contained" onClick={props.action}>{props.txt}</StyledButton>
    )
}