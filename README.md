### `set_base_directory`
작업할 베이스 디렉토리를 설정합니다.
- `path`: 베이스 디렉토리로 설정할 경로

### `get_allowed_directories`
현재 허용된 디렉토리 목록을 조회합니다.
- 매개변수 없음# 파일시스템 MCP 서버

로컬 파일 시스템에 접근할 수 있는 Model Context Protocol (MCP) 서버입니다.

## 프로젝트 구조

```
filesystem-mcp-server/
├── package.json               # 의존성 및 스크립트
├── README.md                  # 이 파일
└── src
  ├── index.js                 # 메인 서버 파일
  ├── config.js                # 설정 및 상수
  ├── pathUtils.js             # 경로 유틸리티
  ├── fileOperations.js        # 파일 작업 함수들
  ├── directoryOperations.js   # 디렉토리 작업 함수들
  ├── toolDefinitions.js       # MCP 도구 정의
  └── .env.example             # 환경변수 예제

```

## 기능

- **파일 작업**
  - 파일 읽기 (`read_file`)
  - 파일 쓰기/생성 (`write_file`)
  - 파일에 내용 추가 (`append_file`)
  - 파일 삭제 (`delete_file`)

- **디렉토리 작업**
  - 디렉토리 생성 (`create_directory`)
  - 디렉토리 삭제 (`delete_directory`)
  - 디렉토리 내용 나열 (`list_directory`)

- **정보 조회**
  - 파일/디렉토리 정보 조회 (`get_file_info`)

## 설치

1. 의존성 설치:
```bash
npm install
```

2. 실행 권한 부여 (Unix/Linux/macOS):
```bash
chmod +x index.js
```

## 윈도우 환경에서의 절대 경로 사용

윈도우에서 `D:\temp2\a.txt`와 같은 절대 경로를 사용하려면:

### 방법 1: 환경변수 설정
```bash
# .env 파일 생성
MCP_ALLOWED_DIR=D:\temp2
```

### 방법 2: 베이스 디렉토리 설정
서버 실행 후 다음 도구를 사용:
```
set_base_directory: D:\temp2
```

### 방법 3: 기본 허용 디렉토리 사용
다음 디렉토리들은 기본적으로 허용됩니다:
- 현재 작업 디렉토리
- 사용자 홈 디렉토리
- Documents 폴더
- Desktop 폴더
- C:\temp, D:\temp, D:\temp2
- /tmp, /var/tmp (Unix/Linux)

### Claude Desktop과 연동

Claude Desktop의 설정 파일에 다음과 같이 추가하세요:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["/path/to/your/filesystem-mcp-server/index.js"]
    }
  }
}
```

## 도구 목록

### `read_file`
파일의 내용을 읽습니다.
- `path`: 읽을 파일의 경로

### `write_file`
파일에 내용을 씁니다 (새 파일 생성 또는 기존 파일 덮어쓰기).
- `path`: 파일 경로
- `content`: 쓸 내용

### `append_file`
파일에 내용을 추가합니다.
- `path`: 파일 경로
- `content`: 추가할 내용

### `delete_file`
파일을 삭제합니다.
- `path`: 삭제할 파일 경로

### `create_directory`
디렉토리를 생성합니다.
- `path`: 생성할 디렉토리 경로
- `recursive`: 상위 디렉토리도 함께 생성할지 여부 (선택사항, 기본값: false)

### `delete_directory`
디렉토리를 삭제합니다.
- `path`: 삭제할 디렉토리 경로
- `recursive`: 하위 디렉토리와 파일도 함께 삭제할지 여부 (선택사항, 기본값: false)

### `list_directory`
디렉토리의 내용을 나열합니다.
- `path`: 나열할 디렉토리 경로

### `get_file_info`
파일 또는 디렉토리의 정보를 가져옵니다.
- `path`: 정보를 가져올 파일/디렉토리 경로

## 보안 고려사항

이 서버는 로컬 파일 시스템에 대한 전체 접근 권한을 제공합니다. 프로덕션 환경에서 사용할 때는 다음 사항을 고려하세요:

1. **경로 제한**: 특정 디렉토리로 접근을 제한하는 기능 추가
2. **권한 검증**: 파일 작업 전 적절한 권한 확인
3. **입력 검증**: 경로 인젝션 공격 방지를 위한 입력 검증 강화

## 요구사항

- Node.js 18.0.0 이상
- @modelcontextprotocol/sdk

## 라이선스

MIT