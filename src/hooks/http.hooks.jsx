export const useHttp = () => {
  const request = async (url, method = "GET", body = null, headers = {"Content-Type": "application/json"}) => {

    try {
      let res = await fetch(url, { method, body, headers });
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      const data = await res.json();
    //   console.log(data);

      return data;
    } catch (e) {
      setError(e.message);
    }
  };
    return {request}
};