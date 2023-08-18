import { request } from '@umijs/max';
import { WEB_SERVE } from '@/utils/constants'

/** 获取图片列表 GET /api/query-list */
export async function QueryList(params: API.QueryListParams, options?: { [key: string]: any }) {
  return request<{
    data: API.QueryList;
  }>(`${WEB_SERVE}/api/query-list`, {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}

/** 删除文件 DELETE /api/delete-features */
export async function DeleteFile(body: API.DeleteFileParams, options?: { [key: string]: any }) {
  return request<{data: API.generalResult}>(`${WEB_SERVE}/api/delete`, {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}

/** 设为裁判 POST /api/generate-judgment */
export async function generateJudgment(body: API.GenerateJudgmentParams, options?: { [key: string]: any }) {
  return request<API.generalResult>(`${WEB_SERVE}/api/generate-judgment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传人工审核结果 POST /api/manual-review */
export async function SubAudit(body: API.SubAuditParams, options?: { [key: string]: any }) {
  return request<API.generalResult>(`${WEB_SERVE}/api/manual-review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 上传特征 POST /api/trigger */
export async function triggerJudgment(options?: { [key: string]: any }) {
  return request<API.generalResult>(`${WEB_SERVE}/api/trigger`, {
    method: 'GET',
    ...(options || {}),
  });
}





/** 获取图片列表 GET /api/get-all-files */
export async function getAllFiles(params: API.GetAllFilesParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetAllFiles;
  }>(`${WEB_SERVE}/api/get-all-files`, {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}

/** 获取图片特征 GET /api/get-all-features */
export async function getAllFeatures(params: API.GetAllFeaturesParams, options?: { [key: string]: any }) {
    return request<{
      data: API.GetAllFeatures;
    }>(`${WEB_SERVE}/api/get-all-features`, {
      method: 'GET',
      params: {
        ...params
      },
      ...(options || {}),
    });
}

/** 上传特征 POST /api/generate-npy */
export async function GenerateNpy(body: API.GenerateNpyParams, options?: { [key: string]: any }) {
    return request<API.GenerateNpy>(`${WEB_SERVE}/api/generate-npy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: body,
      ...(options || {
        timeout: 90000
      }),
    });
}

/** 上传特征 POST /api/upload-feature */
export async function UploadFeature(body: API.UploadFeatureParams, options?: { [key: string]: any }) {
    return request<API.UploadFeatureResult>(`${WEB_SERVE}/api/upload-feature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
}

/** 删除特征 DELETE /api/delete-features */
export async function DeleteFeature(body: API.DeleteFeatureParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`${WEB_SERVE}/api/delete-features`, {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
