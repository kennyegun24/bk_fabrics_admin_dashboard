// Login as admin
export const loginUser = async ({ email, password }, dispatch) => {
  try {
    dispatch(loginPending(true));
    const body = {
      password: password,
      email: email,
    };

    const axio = axios.create({
      baseURL: "https://bk-fabrics-server.vercel.app/api/",
    });
    const req = await axio.post("/auth/login", body);
    const data = await req.data;
    dispatch(loginSuccess(await data));
  } catch (error) {
    dispatch(loginFailure(true));
    alert(error);
  }
};

// Create admin account
export const createAccount = async (
  { firstName, lastName, password, email },
  dispatch
) => {
  const body = {
    first_name: firstName,
    last_name: lastName,
    password: password,
    email: email,
  };

  try {
    dispatch(loginPending(true));
    const axio = axios.create({
      baseURL: "https://bk-fabrics-server.vercel.app/api/",
    });
    const req = await axio.post("/auth/register", body);
    const data = await req.data;
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(true));
  }
};
