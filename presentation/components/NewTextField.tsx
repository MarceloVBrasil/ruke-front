import { TextField } from "@mui/material"

export type NewTextField = {
    name:string,
    width:string,
    value:string,
    onchange:(event:any)=>void;

}

export const NewTextField=({name, width,value,onchange}:NewTextField)=>{
    return (
        <TextField
        autoComplete="given-name"
        name={name}
        value={value}
        onChange={onchange}
        required
        fullWidth
        id={name}
        label={name}
        autoFocus
        sx={{
            width:width,
            height:'100%',
            marginBottom:'15px',
            fontSize:'70px',
            border:'none',
            borderRadius:'10px'
            
        }}
      />
    )
}