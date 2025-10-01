import { styled } from "@mui/system";


export const StyledDatePickerWrapper = styled('div')({
    '& .react-datepicker__header': {
        backgroundColor: 'white',
    },
    '& .react-datepicker__current-month, & .react-datepicker-time__header, & .react-datepicker-year-header': {
        color: 'black',
    },
    '& .react-datepicker__day, & .react-datepicker__time-name': {
        color: 'black',
    },
    '& .react-datepicker': {
        backgroundColor: 'white',
        width: '100% !important',
    },
    '& .react-datepicker-popper': {
        zIndex: 1500,
    },
});