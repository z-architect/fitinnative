import {
  CreatePlanRequestSpec,
  FetchPlanRequestSpec,
  FetchPlanResponseSpec,
  FetchPlansRequestSpec,
  FetchPlansResponseSpec,
  FetchPlanSubscriptionsResponseSpec,
  FetchSessionIntervalsRequestSpec,
  FetchSessionIntervalsResponseSpec,
  Paging,
  RemovePlanRequestSpec,
  SubscribeToPlanRequestSpec,
  UnsubscribeFromPlanRequestSpec,
  UpdatePlanRequestSpec,
  UpdatePlanSubscriptionRequestSpec,
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

  static async fetchPlans(params: FetchPlansRequestSpec) {
    return requestFetch<FetchPlansResponseSpec[]>("/plan", { params });
  }

  static async fetchSessionIntervals(params: FetchSessionIntervalsRequestSpec) {
    return requestFetch<FetchSessionIntervalsResponseSpec>(
      `/plan/${params.id}/intervals`
    );
  }

  static async fetchPlan(params: FetchPlanRequestSpec) {
    return requestFetch<FetchPlanResponseSpec>(`/plan/${params.id}`, {
      params: { private: params.private },
    });
  }

  static async updatePlan(data: UpdatePlanRequestSpec) {
    return requestUpdate<UpdatePlanRequestSpec>("/plan", data);
  }

  static async removePlan(params: RemovePlanRequestSpec) {
    return requestDelete("/plan", { params });
  }

  static async subscribeToPlan(data: SubscribeToPlanRequestSpec) {
    return requestCreate<SubscribeToPlanRequestSpec, string>(
      "/plan/subscription",
      data
    );
  }

  static async fetchPlanSubscriptions(params: Paging) {
    return requestFetch<FetchPlanSubscriptionsResponseSpec[]>(
      "/plan/subscription",
      { params }
    );
  }

  static async updatePlanSubscription(data: UpdatePlanSubscriptionRequestSpec) {
    return requestUpdate<UpdatePlanSubscriptionRequestSpec>(
      "/plan/subscription",
      data
    );
  }

  static async unsubscribeFromPlan(params: UnsubscribeFromPlanRequestSpec) {
    return requestDelete("/plan/subscription", { params });
  }
}
