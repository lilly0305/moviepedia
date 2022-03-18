import { useCallback } from "react/cjs/react.development";
import { useState } from "react/cjs/react.production.min";

function useAsync (asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(async (...args) => {
    // network request를 보낼 때 실행할 함수
    // loading과 error 처리를 담당
    try {
      setError(null);
      setPending(true);

      // 실제로 request를 보내는 함수: api 함수
      return await asyncFunction(...args);

    }catch (error){
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  },[asyncFunction]);

  return[pending, error, wrappedFunction];


}

export default useAsync;