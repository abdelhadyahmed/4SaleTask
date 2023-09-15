import { AxiosResponse } from "./../../node_modules/axios/index.d";
import { IExchange } from "@/Types/IExchange";
import axios from "axios";

export function getAvailableCurrancy() {
  return new Promise((resolve, reject) => {
    return axios
      .get("https://currency-exchange.p.rapidapi.com/listquotes", {
        headers: {
          "X-RapidAPI-Key":
            "b53f13bb43msh451041ebc7baab2p1cfb3ejsn338903d0faf6",
          "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function exchange(data: IExchange): Promise<number> {
  return new Promise((resolve, reject) => {
    return axios
      .get("https://currency-exchange.p.rapidapi.com/exchange", {
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
      })
      .then((res: AxiosResponse<number>) => {
        const numericValue: number = res.data;
        resolve(numericValue);
      })
      .catch((err) => reject(err));
  });
}
