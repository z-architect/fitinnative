import {
  CreateSessionRequestSpec,
  FetchSessionRequestSpec,
  FetchSessionResponseSpec,
  FetchSessionsRequestSpec,
  FetchSessionsResponseSpec,
  FetchSetOrdersRequestSpec,
  FetchSetOrdersResponseSpec,
  RemoveSessionRequestSpec,
  UpdateSessionRequestSpec,
} from "../spec/SessionSpec";
import {
  requestCreate,
  requestDelete,
  requestFetch,
  requestUpdateWithReturn,
} from "../utils";

export class Session {
  static async createSession(data: CreateSessionRequestSpec) {
    return requestCreate<CreateSessionRequestSpec, string>("/session", data);
  }

  static async fetchSessions(params: FetchSessionsRequestSpec) {
    return requestFetch<FetchSessionsResponseSpec>("/session", { params });
  }

  static async fetchSetOrders(params: FetchSetOrdersRequestSpec) {
    return requestFetch<FetchSetOrdersResponseSpec>(
      `/session/${params.id}/orders`
    );
  }

  static async fetchSession(params: FetchSessionRequestSpec) {
    return requestFetch<FetchSessionResponseSpec>(`/session/${params.id}`, {
      params: { private: params.private },
    });
  }

  static async updateSession(data: UpdateSessionRequestSpec) {
    return requestUpdateWithReturn<UpdateSessionRequestSpec, string>(
      "/session",
      data
    );
  }

  static async removeSession(params: RemoveSessionRequestSpec) {
    return requestDelete("/session", { params });
  }
}
