import api from "./api";
// import { Promise } from 'es6-promise'

const auth = {
  user: null,

  getUser() {
    return this.user;
  },

  fetchUser(accessToken) {
    return api.passport
      .verifyJWT(accessToken)
      .then(payload => {
        return api.service("users").get(payload.userId);
      })
      .then(user => {
        return Promise.resolve(user);
      });
  },

  authenticate() {
    console.log("auth", this.user);

    return api
      .authenticate()
      .then(response => {
        console.log("auth successful");

        return this.fetchUser(response.accessToken);
      })
      .then(user => {
        console.log("got user");

        this.user = user;

        return Promise.resolve(user);
      })
      .catch(err => {
        console.log("auth failed", err);

        this.user = null;

        return Promise.reject(err);
      });
  },

  authenticated() {
    return this.user != null;
  },

  signout() {
    console.log("signout");

    return api
      .logout()
      .then(() => {
        console.log("XXX signout successful");

        this.user = null;
        return;
        // return Promise.onLogout
      })
      .catch(err => {
        console.log("signout failed", err);

        return Promise.reject(err);
      });
  },

  onLogout(callback) {
    api.on("logout", () => {
      console.log("onLogout");

      this.user = null;

      callback();
    });
  },

  onAuthenticated(callback) {
    api.on("authenticated", response => {
      console.log("onAuthenticate", response);

      this.fetchUser(response.accessToken)
        .then(user => {
          console.log("onAuthenticate got user");

          this.user = user;

          callback(this.user);
        })
        .catch(err => {
          console.log("onAuthenticate get user failed", err);

          callback(this.user);
        });
    });
  },

  register(email, password, fullName, handle, homepage) {
    return api.service("users").create({
      email: email,
      password: password,
      fullname: fullName,
      handle: handle,
      homepage: homepage
    });
  },

  login(email, password) {
    return api.authenticate({
      strategy: "local",
      email: email,
      password: password
    });
  },

  sendResetPassword: async function sendResetPassword(email) {
    console.info("Auth", "sendResetPassword", { email });
    if (!email) {
      throw new Error("Email invalid!");
    }

    let options = {
      action: "sendResetPwd",
      value: { email }
    };
    try {
      let result = await api.service("authManagement").create(options);
      console.info("Auth", "sendResetPassword", "done", { result });
      return result;
    } catch (e) {
      throw e;
    }
  },

  resetPassword: async function saveResetPassword(slug, password) {
    let options = {
      action: "resetPwdLong",
      value: { token: slug, password }
    };

    let [err, result] = await api.service("authManagement").create(options);

    if (!err) {
      notify.success(
        "Your password was updated. You may now sign in under the new password."
      );
      return true;
    } else {
      notify.warning("Sorry but there was an error updating your password.");
    }
  }
};

export default auth;
