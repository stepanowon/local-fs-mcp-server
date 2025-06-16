import fs from "fs/promises";
import path from "path";
import { validateAndNormalizePath, addAllowedDirectory } from "./pathUtils.js";
import { ALLOWED_BASE_DIRS } from "./config.js";

/**
 * 디렉토리 생성
 */
export async function createDirectory(dirPath, recursive = false) {
  try {
    const validPath = validateAndNormalizePath(dirPath);
    await fs.mkdir(validPath, { recursive });
    return {
      content: [
        {
          type: "text",
          text: `디렉토리 생성 성공: ${validPath}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `디렉토리 생성 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 디렉토리 삭제
 */
export async function deleteDirectory(dirPath, recursive = false) {
  try {
    const validPath = validateAndNormalizePath(dirPath);
    if (recursive) {
      await fs.rm(validPath, { recursive: true, force: true });
    } else {
      await fs.rmdir(validPath);
    }
    return {
      content: [
        {
          type: "text",
          text: `디렉토리 삭제 성공: ${validPath}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `디렉토리 삭제 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 디렉토리 내용 나열
 */
export async function listDirectory(dirPath) {
  try {
    const validPath = validateAndNormalizePath(dirPath);
    const items = await fs.readdir(validPath, { withFileTypes: true });
    const itemList = items.map(item => {
      const type = item.isDirectory() ? "디렉토리" : "파일";
      return `${type}: ${item.name}`;
    }).join("\n");

    return {
      content: [
        {
          type: "text",
          text: `디렉토리 내용 (${validPath}):\n\n${itemList}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `디렉토리 읽기 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 베이스 디렉토리 설정
 */
export async function setBaseDirectory(dirPath) {
  try {
    const validPath = path.resolve(dirPath);
    const stats = await fs.stat(validPath);
    
    if (!stats.isDirectory()) {
      return {
        content: [
          {
            type: "text",
            text: `오류: ${validPath}는 디렉토리가 아닙니다.`,
          },
        ],
        isError: true,
      };
    }

    // 허용된 디렉토리 목록에 추가
    addAllowedDirectory(validPath);

    return {
      content: [
        {
          type: "text",
          text: `베이스 디렉토리 설정 성공: ${validPath}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `베이스 디렉토리 설정 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 허용된 디렉토리 목록 조회
 */
export async function getAllowedDirectories() {
  const existingDirs = [];
  
  for (const dir of ALLOWED_BASE_DIRS) {
    try {
      await fs.access(dir);
      existingDirs.push(dir);
    } catch {
      // 디렉토리가 존재하지 않으면 무시
    }
  }

  return {
    content: [
      {
        type: "text",
        text: `허용된 디렉토리 목록:\n\n${existingDirs.join("\n")}`,
      },
    ],
  };
}