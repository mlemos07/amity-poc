import { MessageRepository } from "@amityco/ts-sdk";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../../Context";

const Message = ({ message }: any) => {
  const { user } = useContext(Context);
  async function deleteMessage(messageId: any) {
    const message = await MessageRepository.softDeleteMessage(messageId);
    return message;
  }
  return (
    <Stack alignItems="center" direction="row" gap="8px" sx={{ width: "100%" }}>
      <Stack justifyContent="flex-end" sx={{ height: "100%" }}>
        <Avatar sx={{ height: 30, width: 30 }} />
      </Stack>
      <Stack sx={{ height: "100%", width: "100%" }}>
        <Typography
          sx={{ color: "#3699FF", fontSize: 14, fontWeight: 600, mb: "4px" }}
        >
          {message.metadata.user.name}
        </Typography>
        <Stack
          alignItems="center"
          direction="row"
          gap="8px"
          sx={{ maxWidth: "90%" }}
        >
          <Box
            sx={{
              bgcolor: "#cdcdcd",
              borderRadius: "8px",
              height: "auto",
              padding: "8px",
            }}
          >
            <Typography
              sx={{ color: "#000", fontSize: 14, wordBreak: "break-all" }}
            >
              {message.data.text}
            </Typography>
          </Box>
          {user.isModerator && (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => deleteMessage(message.messageId)}
            >
              remover
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Message;
