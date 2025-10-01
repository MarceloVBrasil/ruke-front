import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

export function ProgressBarWithLabel({ value, label }: any) {
    return (
        <Box display="flex" alignItems="center" width="100%">
            <Box flex={1} mr={1}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box flex={1} minWidth={35}>
                <Typography variant="body2" color="textSecondary">
                    {label}
                </Typography>
            </Box>
        </Box>
    );
}