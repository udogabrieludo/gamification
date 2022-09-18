export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

export const updateLocalStorage = (obj) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.name = obj.name;
  user.phone = obj.phone;
  localStorage.setItem("user", JSON.stringify(user));
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    next();
  }
};
