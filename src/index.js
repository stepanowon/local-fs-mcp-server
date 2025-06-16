#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

// 모듈 임포트
import { SERVER_CONFIG } from "./config.js";
import { TOOL_DEFINITIONS } from "./toolDefinitions.js";
import {
  readFile,
  writeFile,
  appendFile,
  deleteFile,
  getFileInfo,
} from "./fileOperations.js";
import {
  createDirectory,
  deleteDirectory,
  listDirectory,
  setBaseDirectory,
  getAllowedDirectories,
} from "./directoryOperations.js";

class FileSystemServer {
  constructor() {
    this.server = new Server(SERVER_CONFIG, {
      capabilities: {
        tools: {},
      },
    });

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // 도구 목록 반환
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: TOOL_DEFINITIONS,
      };
    });

    // 도구 실행 핸들러
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "read_file":
            return await readFile(args.path);

          case "write_file":
            return await writeFile(args.path, args.content);

          case "append_file":
            return await appendFile(args.path, args.content);

          case "delete_file":
            return await deleteFile(args.path);

          case "create_directory":
            return await createDirectory(args.path, args.recursive);

          case "delete_directory":
            return await deleteDirectory(args.path, args.recursive);

          case "list_directory":
            return await listDirectory(args.path);

          case "get_file_info":
            return await getFileInfo(args.path);

          case "set_base_directory":
            return await setBaseDirectory(args.path);

          case "get_allowed_directories":
            return await getAllowedDirectories();

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `알 수 없는 도구: ${name}`
            );
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `도구 실행 중 오류 발생: ${error.message}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("파일시스템 MCP 서버가 시작되었습니다.");
  }
}

const server = new FileSystemServer();
server.run().catch(console.error);