import {
  FetchResourceSpec,
  RemoveResourcesSpec,
  ReplaceResourceSpec,
  UploadEntity,
  UploadResourceResponseSpec,
} from "../Spec/UploadSpec";
import { instance } from "../config";
import { SuccessData } from "../Spec/CommonSpec";

class Upload {
  static async uploadResource(
    files: [any],
    _for: UploadEntity
  ): Promise<SuccessData<UploadResourceResponseSpec> | null> {
    try {
      const formData = new FormData();
      formData.append("files", files);
      formData.append("for", _for);

      const res = await instance.post(
        `${instance.defaults.baseURL}/upload`,
        formData,
        { headers: { "content-type": "multipart/form-data" } }
      );

      if (res.data && res.data.data) return res.data;

      return null;
    } catch (err) {
      return null;
    }
  }

  static async fetchResource(
    params: FetchResourceSpec
  ): Promise<SuccessData<any> | null> {
    try {
      const res = await instance.get(`${instance.defaults.baseURL}/upload`, {
        params,
      });

      if (res.data && res.data.error) return null;
      if (res.data) return { data: res.data };

      return null;
    } catch (err) {
      return null;
    }
  }

  static async replaceResource(
    file: any,
    params: ReplaceResourceSpec
  ): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      for (const param of Object.entries(params)) {
        formData.append(param[0], param[1]);
      }

      const res = await instance.put(
        `${instance.defaults.baseURL}/upload`,
        formData,
        { headers: { "content-type": "multipart/form-data" } }
      );

      return res.status === 204;
    } catch (err) {
      return false;
    }
  }

  static async removeResources(params: RemoveResourcesSpec): Promise<boolean> {
    try {
      const res = await instance.delete(`${instance.defaults.baseURL}/upload`, {
        params,
      });

      return res.status === 204;
    } catch (err) {
      return false;
    }
  }
}
