import { Tensor } from "onnxruntime-web";
export interface imageItem {
  id: string,
  scene_id: string,
  user_id: string,
  img_path: string,
  img_type: string,
  judge_sign: string,
  judge_score: string,
  artificial_judge_sign: string
}

export interface imgItem {
  src: string,
  fileName: string,
  segamentCount: number
}

export interface ImgCardProps {
  imgItem: imageItem,
  deleteHandler?: (e: any | null) => void;
  setEditImg?: (e: any | null) => void;
  initImgList?: (e: any | null) => void;
}

export interface StageWarpperProps {
  fileName: string | undefined
}

export interface ConfirmModalProps {
  title: string,
  content: string,
  showModal: boolean,
  handleOk: (e: any | null) => void;
  handleCancel: (e: any) => void;
}

export interface modelInputProps {
  x: number;
  y: number;
  clickType: number;
}

export interface modelScaleProps {
  samScale: number;
  height: number;
  width: number;
}

export interface modeDataProps {
  clicks?: Array<modelInputProps>;
  tensor: Tensor;
  modelScale: modelScaleProps;
}

export interface ToolProps {
  handleMouseMove: (e: any) => void;
}

export interface selectEle {
  id: string,
  imgSrc: string,
  from: string,
  timestamps: number
}

export interface ThumbnailProps {
  imgSrc: string,
  idx: number,
  from: string
}
