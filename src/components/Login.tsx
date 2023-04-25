import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Login() {
  const { data, error, isLoading } = useSWR("http://localhost:4000/", fetcher);
  const { mutate } = useSWRConfig();

  if (error) return <h3>{error.message} </h3>;
  if (isLoading) return <h3>loading...</h3>;




  // render data
  return data.loggedin ? (
    <>
      <h2>Welcome, UniversalUser!</h2>
      <button
        onClick={() => {
          axios
            .post("http://localhost:4000/logout")
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.error(error);
            });
          mutate("http://localhost:4000/");
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <h1>Please, login</h1>

      <button
        onClick={() => {
          axios
            .post("http://localhost:4000/login")
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.error(error);
            });
          mutate("http://localhost:4000/");
        }}
      >
        Login
      </button>
    </>
  );
}

export default Login;
