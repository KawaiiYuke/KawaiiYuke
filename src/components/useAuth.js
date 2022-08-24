import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // window.history.pushState({}, null, "/");
      })
      .catch(() => {
        // window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        });
      //   .catch(() => {
      //     window.location = "/";
      //   });
    }, (expiresIn - 60) * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [refreshToken, expiresIn]);

  // axios("https://accounts.spotify.com/api/token", {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     Authorization:
  //       "Basic " +
  //       btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET),
  //   },
  //   data: "grant_type=client_credentials",
  //   method: "POST",
  // }).then((tokenResponse) => {
  //   setAccessToken(tokenResponse.data.access_token);
  // });
  return accessToken;
}
