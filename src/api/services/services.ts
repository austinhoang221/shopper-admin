import { Context } from "@utils/context";
import { HTTPStatusCodeType } from "api/enums/HttpStatusCodeType";

const baseUrl = "http://localhost:5283";
const authorizedFetchFunction = (
  url: RequestInfo,
  init: RequestInit
): Promise<Response> => {
  const controller: AbortController = new AbortController();
  const signal: AbortSignal = controller.signal;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Context.token}`,
    "Access-Control-Max-Age": 600,
    signal,
  };
  init = init || {};
  init.headers = { ...init.headers, ...(headers as any) };
  return fetch(url, init);
};

const catchServiceErrors = <T>(target: T): T => {
  const prototype = Object.getPrototypeOf(target);
  for (const key of Object.getOwnPropertyNames(prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
    if (descriptor && typeof descriptor.value === "function") {
      const originalMethod = descriptor.value;
      descriptor.value = async function (...args: A[]) {
        try {
          const res = await originalMethod.apply(this, args);
          if (res?.statusCode === HTTPStatusCodeType.INTERNAL_SERVER_ERROR) {
            localStorage.setItem("IsCommonServerError", "true");
            dispatchEvent(new Event("storage"));
            return new Promise(() => {});
          }
          return res;
        } catch (error) {
          handleServiceError(error);
        }
      };
      Object.defineProperty(prototype, key, descriptor);
    }
  }
  return target;
};

const handleServiceError = (error: A) => {
  // Handle service error
  switch (error.status) {
    case HTTPStatusCodeType.UNAUTHORIZED:
      window.sessionStorage.clear();
      window.localStorage.clear();
      window.document.location = `${window.location.origin}/login`;
      break;
    case HTTPStatusCodeType.INTERNAL_SERVER_ERROR:
      localStorage.setItem("IsServerError", "true");
      dispatchEvent(new Event("storage"));
      break;
    case HTTPStatusCodeType.NOT_FOUND:
      localStorage.setItem("isShowNotFoundPage", "true");
      dispatchEvent(new Event("storage"));
      break;
    default:
      console.error(error);
      break;
  }
};
