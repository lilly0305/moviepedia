import { useState } from "react/cjs/react.production.min";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    // 로딩과 에러 처리
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);

    } catch (error) {
      setError(error);
      return;

    } finally {
      setPending(false);
    }
  }

  return[pending, error, wrappedFunction];

}

export default useAsync;