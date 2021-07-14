import axios from "axios";

export const analyzeImg = async (imgBase64: string) => {
  let img: string[] = [];
  img.push(imgBase64);
  return await axios.post("http://localhost:5000/analyze", { img });
};
export const superResolutionImg = async (imgBase64: string) => {
  let img: string[] = [];
  img.push(imgBase64);
  return await axios.post("http://localhost:5500/super-resolution", { img });
};
