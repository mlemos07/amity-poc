import { API_REGIONS, Client, enableCache } from "@amityco/ts-sdk";
import {
  Button,
  Card,
  CardContent,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";

const apiKey = "b0eae80b6cd9f5331f62d8495b0d13de8108d8b6bf323b7e";

const Form = () => {
  const { setUser } = useContext(Context);
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);
  const createClient = () => {
    Client.createClient(apiKey, API_REGIONS.US);
    enableCache();
  };
  const sessionHandler: Amity.SessionHandler = {
    sessionWillRenewAccessToken(renewal) {
      renewal.renew();
    },
  };
  const connectClient = async (userId: string, displayName: string) => {
    await Client.login({ userId, displayName }, sessionHandler);
  };
  const goToChat = async () => {
    if (inputRef.current) {
      const { value } = inputRef.current;
      if (value) {
        createClient();
        // futuramente, este será o id do usuário logado
        const userId = value;
        await connectClient(userId, value);
        setUser({ id: userId, name: value });
        navigate(`/chat`);
      }
    }
  };
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
      <Card sx={{ minHeight: 150, width: 400 }}>
        <CardContent>
          <Typography>Insira seu nome</Typography>
          <OutlinedInput
            inputProps={{ ref: inputRef }}
            placeholder="Ex: Vitinho"
            sx={{ height: 37, mt: "12px", width: "100%" }}
          />
          <Button
            sx={{ color: "#fff", bgcolor: "#3699FF", mt: "8px", width: "100%" }}
            onClick={goToChat}
          >
            Entrar
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Form;
