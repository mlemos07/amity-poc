import {
  ChannelRepository,
  MessageContentType,
  MessageRepository,
} from "@amityco/ts-sdk";
import {
  Button,
  Card,
  CardContent,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { membersIcon, sendIcon } from "./assets";
import { Context } from "../../Context";
import Message from "./components/Message";

const channelId = "660b04957644e27d41c87136";

const Chat = () => {
  const { user, setUser } = useContext(Context);
  const messageContainer = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const [channelInfo, setChannelInfo] = useState<any>(null);
  const [didJoinChannel, setDidJoinChannel] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const putScrollAtEndPage = useCallback(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, []);
  const userIsModerator = useCallback(
    ({ data: users }: any) => {
      const isModerator = !!users.find(
        (currentUser: any) => currentUser.userId === user.id
      );
      setUser((prevState: any) => ({ ...prevState, isModerator }));
    },
    [setUser, user.id]
  );
  useEffect(() => {
    ChannelRepository.Membership.searchMembers(
      { channelId, roles: ["channel-moderator"] },
      userIsModerator
    );
  }, [userIsModerator]);
  useEffect(() => {
    const joinChannel = async () => {
      try {
        const didJoinChannel = await ChannelRepository.joinChannel(channelId);
        setDidJoinChannel(didJoinChannel);
      } catch (err) {
        console.log("err", err);
      }
    };
    joinChannel();
    return () => {
      setUser(null);
    };
  }, [setUser]);
  useEffect(() => {
    if (didJoinChannel) {
      ChannelRepository.getChannel(
        channelId,
        ({ data: channel, loading, error }) => {
          setChannelInfo(channel);
        }
      );
    }
  }, [didJoinChannel]);
  useEffect(() => {
    const getMessages = () =>
      MessageRepository.getMessages(
        { subChannelId: channelId, limit: 100 },
        ({ data: messageList, onNextPage, hasNextPage, loading, error }) => {
          if (error) {
          }
          if (loading) {
          }
          if (messageList) {
            // console.log("messages na função", messageList);
            setMessages(messageList.reverse());
          }
        }
      );
    if (didJoinChannel) {
      getMessages();
    }
  }, [didJoinChannel]);
  useEffect(() => {
    if (messageContainer.current) {
      putScrollAtEndPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [putScrollAtEndPage, messageContainer.current]);
  if (!channelInfo) {
    return <div>Buscando informações da conversa</div>;
  }
  if (!didJoinChannel) {
    return <div>Entrando na conversa</div>;
  }
  const sendTextMessage = async () => {
    const { value } = inputRef.current;
    if (value) {
      const textMessage = {
        subChannelId: channelId,
        dataType: MessageContentType.TEXT,
        data: {
          text: value,
        },
        metadata: { user },
      };

      const { data: message } = await MessageRepository.createMessage(
        textMessage
      );
      if (message) {
        putScrollAtEndPage();
        inputRef.current.value = "";
      }
    }
  };
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
      <Card sx={{ height: "95%", width: 756 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "12px",
            height: "100%",
            paddingBottom: "8px !important",
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Typography>{channelInfo.displayName}</Typography>
            <Typography>
              <img
                src={membersIcon as unknown as any}
                alt="Quantidade de membros"
                style={{ marginRight: "8px" }}
              />
              {channelInfo.memberCount}
            </Typography>
          </Stack>
          <Stack
            ref={messageContainer}
            sx={{
              bgcolor: "#F3F6F9",
              height: "80%",
              overflowY: "auto",
              px: "8px",
              py: "12px",
            }}
          >
            {messages.map((message: any) => (
              <Message key={message.messageId} message={message} />
            ))}
            {/* <Message
              message={{
                metadata: {
                  user: {
                    name: "Marianna",
                  },
                },
              }}
            /> */}
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            sx={{ height: "60px" }}
          >
            <OutlinedInput
              inputProps={{ ref: inputRef }}
              placeholder="Envie uma mensagem..."
              sx={{
                bgcolor: "#F3F6F9",
                borderRadius: "22px",
                height: "100%",
                width: "90%",
              }}
            />
            <Button
              sx={{
                bgcolor: "#F3F6F9",
                borderRadius: "50%",
                color: "#fff",
                height: 55,
                minWidth: 0,
                width: 55,
                p: 0,
              }}
              onClick={sendTextMessage}
            >
              <img
                src={sendIcon as unknown as any}
                alt="Botão de enviar mensagem"
              />
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Chat;
