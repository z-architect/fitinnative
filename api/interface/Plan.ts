import {
  CreatePlanRequestSpec,
  FetchPlanRequestSpec,
  FetchPlanResponseSpec,
  FetchPlansRequestSpec,
  FetchPlansResponseSpec,
  Paging,
  SubscribeToPlanRequestSpec,
  UpdatePlanRequestSpec,
} from "../spec";
import {
  requestCreate,
  requestDelete,
  requestFetch,
  requestUpdate,
} from "../utils";

export class Plan {
  static async createPlan(data: CreatePlanRequestSpec) {
    return requestCreate<CreatePlanRequestSpec, string>("/plan", data);
  }

  static async fetchPlans(params: FetchPlansRequestSpec[]) {
    return requestFetch<FetchPlansResponseSpec[]>("/plan", { params });
  }

  static async fetchPlan(params: FetchPlanRequestSpec) {
    return requestFetch<FetchPlanResponseSpec>(`/plan/${params.id}`, {
      params: { private: params.private },
    });
  }

  static async updatePlan(data: UpdatePlanRequestSpec) {
    return requestUpdate<UpdatePlanRequestSpec>("/plan", data);
  }

  static async removePlan(planID: string) {
    return requestDelete("/plan", { params: { id: planID } });
  }

  static async subscribeToPlan(data: SubscribeToPlanRequestSpec) {
    return requestCreate("/plan/subscription", data);
  }

  static async getPlanSubscriptions(params: Paging) {
    return requestFetch("/plan/subscription", { params });
  }

  static async unsubscribeFromPlan(userPlanId: string) {
    return requestDelete("/plan/subscription", { params: { id: userPlanId } });
  }
}
