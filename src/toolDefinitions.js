export const TOOL_DEFINITIONS = [
  {
    name: "read_file",
    description: "파일 내용을 읽습니다",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "읽을 파일의 경로",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "write_file",
    description: "파일에 내용을 씁니다 (새 파일 생성 또는 기존 파일 덮어쓰기)",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "쓸 파일의 경로",
        },
        content: {
          type: "string",
          description: "파일에 쓸 내용",
        },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "append_file",
    description: "파일에 내용을 추가합니다",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "내용을 추가할 파일의 경로",
        },
        content: {
          type: "string",
          description: "추가할 내용",
        },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "delete_file",
    description: "파일을 삭제합니다",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "삭제할 파일의 경로",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "create_directory",
    description: "디렉토리를 생성합니다",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "생성할 디렉토리의 경로",
        },
        recursive: {
          type: "boolean",
          description: "상위 디렉토리도 함께 생성할지 여부",
          default: false,
        },
      },
      required: ["path"],
    },
  },
  {
    name: "delete_directory",
    description: "디렉토리를 삭제합니다",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "삭제할 디렉토리의 경로",
        },
        recursive: {
          type: "boolean",
          description: "하위 디렉토리와 파일도 함께 삭제할지 여부",
          default: false,
        },
      },
      required: ["path"],
    },
  },
  {
    name: "list_directory",
    description: "디렉토리의 내용을 나열합니다",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "나열할 디렉토리의 경로",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "get_file_info",
    description: "파일 또는 디렉토리의 정보를 가져옵니다",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "정보를 가져올 파일/디렉토리의 경로",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "set_base_directory",
    description: "작업할 베이스 디렉토리를 설정합니다",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "베이스 디렉토리로 설정할 경로",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "get_allowed_directories",
    description: "현재 허용된 디렉토리 목록을 조회합니다",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];