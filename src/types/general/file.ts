export type FileModelUpload = {
  file: File;
  type: string;
  fileable_type: string;
  fileable_id: string;
  file_description: string;
};
export interface FileWithId {
  id: string;
  file: File;
  isFetched?: boolean;
}
export interface ImageModel {
  created_at: string;
  id: string;
  title: string;
  model_id: string;
  type: string;
  updated_at: string;
  url: string;
}

export interface FileModel {
  id: string;
  fileable_id: string;
  fileable_type: string;
  title?: string;
  file_name: string;
  file_url: string;
  file_type?: string;
  file_description?: string;
  extension?: string;
  file_size?:number;
  created_at:string;
  updated_at:string;
}