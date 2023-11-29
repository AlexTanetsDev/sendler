import { IClient } from "@/globaltypes/types";

export const createSmsUrlStr = (clients: IClient[], text: string): string => {
  const adaptedText = text.split(" ").join("+");
  const distination =
    clients.length === 1 ? "DestinationAddress" : "DestinationAddresses";

  const str = clients
    .map((client) => {
      return `${distination}=${client.tel}&Data=${adaptedText}&`;
    })
    .join("");
  return str.slice(0, str.length - 1);
};
