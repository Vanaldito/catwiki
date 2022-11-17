import { useEffect, useState } from "react";
import { FetchCall } from "../models";

export default function useFetchAndLoad() {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  async function callEndpoint<T>(fetchCall: FetchCall<T>) {
    if (fetchCall.controller) controller = fetchCall.controller;
    setLoading(true);
    let result = {} as T;
    try {
      result = await fetchCall.call;
    } catch (err) {
      setLoading(false);
      throw err;
    }
    setLoading(false);
    return result;
  }

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { loading, callEndpoint };
}
