import { Avatar, Box, Stack, Typography } from "@mui/material";

const Message = ({ message }: any) => {
  return (
    <Stack alignItems="center" direction="row" gap="8px">
      <Stack justifyContent="flex-end" sx={{ height: "100%" }}>
        <Avatar sx={{ height: 30, width: 30 }} />
      </Stack>
      <Stack
        sx={{
          height: "100%",
        }}
      >
        <Typography
          sx={{ color: "#3699FF", fontSize: 14, fontWeight: 600, mb: "4px" }}
        >
          {message.metadata.user.name}
        </Typography>
        <Box
          sx={{
            bgcolor: "#cdcdcd",
            borderRadius: "8px",
            height: "auto",
            padding: "8px",
          }}
        >
          <Typography
            sx={{ color: "#000", fontSize: 14, wordBreak: "break-word" }}
          >
            {message.data.text}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Message;
