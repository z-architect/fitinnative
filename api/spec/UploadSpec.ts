export enum UploadEntity {
  CONSUMER = "CONSUMER",
  ACTIVITY = "ACTIVITY",
  FOOD_ITEM = "FOOD_ITEM",
  SESSION = "SESSION",
  PLAN = "PLAN",
}

export interface UploadResourceRequestSpec {
  for: UploadEntity;
}

export type UploadResourceResponseSpec = string[];

export interface FetchResourceSpec {
  mediaID: string;
}

export interface ReplaceResourceSpec extends UploadResourceRequestSpec {
  entityID: string;
  mediaID: string;
}

export interface RemoveResourcesSpec extends UploadResourceRequestSpec {
  entityID: string;
  mediaIDs: string[];
}
