import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function useLoginSpotify() {
  const { setUser } = useContext(UserContext);

  const generateCode = async () => {
    let accessToken =
      "BQAzUUdQ7Uh5rSLsP41vCKsEZjS1P0KIJjV8lKXgSDvGIkiOatKu3tRhWor-0hVQzyqV7VWnr-Pk3BlV6UiNumxf83Nfh0JT-lH5KVhUiLF3NHaSpKuwuvGbUICGvtmtTjySufHguKjEKdft-fQZ2Znf2PPxiKe0HFYE9AkMK8_0skcqHq_YbbWMG6rGQi5LfZOhMGL0wifQBG8VP-AqjA";

    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce(
      (acc, x) => acc + possible[x % possible.length],
      ""
    );

    const data = new TextEncoder().encode(randomString);
    const hashed = await crypto.subtle.digest("SHA-256", data);

    const clientId = "ffe30f6fa76e49a8bc17153064c99a7f";
    const redirectUrl = "http://localhost:5173/";

    const authorizationEndpoint = "https://accounts.spotify.com/authorize";
    const scope = "user-read-private user-read-email";

    const code_challenge_base64 = btoa(
      String.fromCharCode(...new Uint8Array(hashed))
    )
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    // save storage
    window.localStorage.setItem("code_verifier", randomString);
    window.localStorage.setItem("access_token", accessToken);

    const authUrl = new URL(authorizationEndpoint);
    const params = {
      response_type: "code",
      client_id: clientId,
      scope: scope,
      code_challenge_method: "S256",
      code_challenge: code_challenge_base64,
      redirect_uri: redirectUrl,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  const getUser = async () => {
    try {
      const accessToken =
        "BQAzUUdQ7Uh5rSLsP41vCKsEZjS1P0KIJjV8lKXgSDvGIkiOatKu3tRhWor-0hVQzyqV7VWnr-Pk3BlV6UiNumxf83Nfh0JT-lH5KVhUiLF3NHaSpKuwuvGbUICGvtmtTjySufHguKjEKdft-fQZ2Znf2PPxiKe0HFYE9AkMK8_0skcqHq_YbbWMG6rGQi5LfZOhMGL0wifQBG8VP-AqjA";
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(data.display_name);
        return data;
      }
      throw new Error("error al cargar");
    } catch (error) {
      console.log("erro", error);
    }
  };

  return {
    generateCode,
    getUser,
  };
}
