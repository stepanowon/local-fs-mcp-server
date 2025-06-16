import os from "os";
import path from "path";

// 허용된 베이스 디렉토리 설정 (환경변수로 설정 가능)
export const ALLOWED_BASE_DIRS = [
  process.env.MCP_ALLOWED_DIR || process.cwd(),
  os.homedir(),
  path.join(os.homedir(), "Documents"),
  path.join(os.homedir(), "Desktop"),
  "C:\\temp",
  "D:\\temp",
  "D:\\temp2",
  "/tmp",
  "/var/tmp"
].filter(dir => dir); // undefined 값 제거

export const SERVER_CONFIG = {
  name: "filesystem-server",
  version: "0.1.0",
  capabilities: {
    tools: {},
  },
};