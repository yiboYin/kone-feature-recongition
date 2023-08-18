declare namespace API {
    type QueryList = {
        data?: Array<imageItem>;
        count?: number;
        success: boolean;
    };

    type QueryListParams = {
        page_number?: number;
        page_size?: number;
        img_type?: string;
        judge_sign?: string;
    };

    type generalResult = {
        data: string;
        success: boolean;
    };

    type DeleteFileParams = {
        ids?: string[];
        img_type: string;
    };

    type GenerateJudgmentParams = {
        ids?: string[]
    };

    type SubAuditParams = {
        ids?: string[],
        artificial_judge_sign: string

    };

    type GetAllFiles = {
        data: Array<string>;
        success: boolean;
    };

    type GetAllFilesParams = {
        current?: number;
        pageSize?: number;
    };

    type GetAllFeatures = {
        data?: string;
    };

    type GetAllFeaturesParams = {
        id?: string;
    };

    type GenerateNpy = {
        data: string;
        success: boolean;
    };

    type GenerateNpyParams = {
        fileName?: string;
    };

    type UploadFeatureParams = {
        payload?: { name?: string; data?: string }[];
    };

    type UploadFeatureResult = {
        success?: string;
    };

    type DeleteFeatureParams = {
        ids?: string[];
    };
}