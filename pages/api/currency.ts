import { AxiosResponse } from "./../../node_modules/axios/index.d";
import { IExchange } from "@/Types/IExchange";
import axios from "axios";

export async function getAvailableCurrancy() {
  try {
    const response = await axios.get(
      "https://currency-exchange.p.rapidapi.com/listquotes",
      {
        headers: {
          "X-RapidAPI-Key":
            "b53f13bb43msh451041ebc7baab2p1cfb3ejsn338903d0faf6",
          "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function exchange(data: IExchange): Promise<number> {
  try {
    const response: AxiosResponse<number> = await axios.get(
      "https://currency-exchange.p.rapidapi.com/exchange",
      {
        params: {
          from: data.from,
          to: data.to,
          q: data.quantity,
        },
        headers: {
          "X-RapidAPI-Key":
            "b53f13bb43msh451041ebc7baab2p1cfb3ejsn338903d0faf6",
          "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
