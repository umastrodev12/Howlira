import dotenv from "dotenv";
import { AccessToken } from "livekit-server-sdk";

dotenv.config();

const rtc_url = process.env.RTC_URL;
const api = process.env.RTC_API_KEY;
const secret = process.env.RTC_SECRET;

// validação de segurança
if (!rtc_url || api || secret) {
  throw new Error(
    "[HOWLIRA RTC] A API Key e a URL do projeto do LiveKit não foi definida ou encontrada!",
  );
}

export const generateCallToken = async (
  participantName: string,
  roomName: string,
) => {
  try {
    const at = new AccessToken(api, secret, {
      identity: participantName,
    });

    // Permissões de Voz e Vídeo
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true, // Pode enviar áudio/vídeo
      canSubscribe: true, // Pode receber áudio/vídeo dos outros
    });

    return await at.toJwt();
  } catch (error) {
    console.error("Falha ao gerar Token RTC para o Howilira:", error);
    throw error;
  }
};

export { rtc_url };