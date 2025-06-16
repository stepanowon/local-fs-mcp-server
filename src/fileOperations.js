import fs from "fs/promises";
import path from "path";
import { validateAndNormalizePath } from "./pathUtils.js";

/**
 * 파일 읽기
 */
export async function readFile(filePath) {
  try {
    const validPath = validateAndNormalizePath(filePath);
    const content = await fs.readFile(validPath, "utf-8");
    return {
      content: [
        {
          type: "text",
          text: `파일 읽기 성공: ${validPath}\n\n${content}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `파일 읽기 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 파일 쓰기
 */
export async function writeFile(filePath, content) {
  try {
    const validPath = validateAndNormalizePath(filePath);
    // 디렉토리가 존재하지 않으면 생성
    const dir = path.dirname(validPath);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(validPath, content, "utf-8");
    return {
      content: [
        {
          type: "text",
          text: `파일 쓰기 성공: ${validPath}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `파일 쓰기 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 파일에 내용 추가
 */
export async function appendFile(filePath, content) {
  try {
    const validPath = validateAndNormalizePath(filePath);
    await fs.appendFile(validPath, content, "utf-8");
    return {
      content: [
        {
          type: "text",
          text: `파일 내용 추가 성공: ${validPath}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `파일 내용 추가 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 파일 삭제
 */
export async function deleteFile(filePath) {
  try {
    const validPath = validateAndNormalizePath(filePath);
    await fs.unlink(validPath);
    return {
      content: [
        {
          type: "text",
          text: `파일 삭제 성공: ${validPath}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `파일 삭제 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 파일 정보 조회
 */
export async function getFileInfo(filePath) {
  try {
    const validPath = validateAndNormalizePath(filePath);
    const stats = await fs.stat(validPath);
    const info = {
      경로: validPath,
      유형: stats.isDirectory() ? "디렉토리" : "파일",
      크기: stats.isFile() ? `${stats.size} bytes` : "N/A",
      생성일: stats.birthtime.toISOString(),
      수정일: stats.mtime.toISOString(),
      접근일: stats.atime.toISOString(),
      권한: `0${(stats.mode & parseInt('777', 8)).toString(8)}`,
    };

    const infoText = Object.entries(info)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `파일/디렉토리 정보:\n\n${infoText}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `파일 정보 가져오기 실패: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}