import path from "path";
import { ALLOWED_BASE_DIRS } from "./config.js";

/**
 * 경로 검증 및 정규화
 * @param {string} inputPath - 입력 경로
 * @returns {string} - 검증된 정규화된 경로
 */
export function validateAndNormalizePath(inputPath) {
  // 경로 정규화
  const normalizedPath = path.resolve(inputPath);
  
  // 윈도우에서 드라이브 문자 처리
  const isWindows = process.platform === 'win32';
  
  if (isWindows) {
    // 윈도우에서는 드라이브 문자가 포함된 절대 경로 허용
    const pathParts = normalizedPath.split(path.sep);
    const drive = pathParts[0];
    
    // 허용된 베이스 디렉토리 중 하나와 일치하는지 확인
    const isAllowed = ALLOWED_BASE_DIRS.some(baseDir => {
      const normalizedBaseDir = path.resolve(baseDir);
      return normalizedPath.startsWith(normalizedBaseDir) || normalizedPath === normalizedBaseDir;
    });
    
    if (!isAllowed) {
      // 절대 경로가 허용되지 않은 경우 현재 작업 디렉토리 기준으로 처리
      console.error(`경고: ${normalizedPath}는 허용되지 않은 경로입니다. 현재 작업 디렉토리 기준으로 처리합니다.`);
      return path.resolve(process.cwd(), inputPath);
    }
  }
  
  return normalizedPath;
}

/**
 * 베이스 디렉토리를 허용 목록에 추가
 * @param {string} dirPath - 추가할 디렉토리 경로
 */
export function addAllowedDirectory(dirPath) {
  const validPath = path.resolve(dirPath);
  if (!ALLOWED_BASE_DIRS.includes(validPath)) {
    ALLOWED_BASE_DIRS.push(validPath);
  }
}