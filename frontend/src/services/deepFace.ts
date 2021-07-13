import httpClient from "../utils/http_client";

export const analyzeImg = async (
    imgBase64: string
  ) => {
    let img:string[] = [];
    img.push(imgBase64);
    return await httpClient.post("/analyze", { img });
};