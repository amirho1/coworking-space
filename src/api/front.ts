import { config } from "@/lib/config";
import axios from "axios";

const axiosFront = axios.create({
  baseURL: config?.frontendUrl,
});

export default axiosFront;
