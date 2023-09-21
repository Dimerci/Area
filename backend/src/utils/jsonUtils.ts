// src/utils/jsonUtils.ts
export function createJsonResponse(data: any) {
    return JSON.stringify(data, null, 2);
  }