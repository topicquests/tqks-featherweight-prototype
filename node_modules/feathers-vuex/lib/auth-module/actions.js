'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAuthActions;
function makeAuthActions(feathersClient, globalModels) {
  return {
    authenticate: function authenticate(store, data) {
      var commit = store.commit,
          state = store.state,
          dispatch = store.dispatch;


      commit('setAuthenticatePending');
      if (state.errorOnAuthenticate) {
        commit('clearAuthenticateError');
      }
      return feathersClient.authenticate(data).then(function (response) {
        if (response.accessToken) {
          commit('setAccessToken', response.accessToken);

          // Decode the token and set the payload, but return the response
          return feathersClient.passport.verifyJWT(response.accessToken).then(function (payload) {
            commit('setPayload', payload);

            // Populate the user if the userService was provided
            if (state.userService && payload.hasOwnProperty('userId')) {
              return dispatch('populateUser', payload.userId).then(function () {
                commit('unsetAuthenticatePending');
                return response;
              });
            } else {
              commit('unsetAuthenticatePending');
            }
            return response;
          });
          // If there was not an accessToken in the response, allow the response to pass through to handle two-factor-auth
        } else {
          return response;
        }
      }).catch(function (error) {
        commit('setAuthenticateError', error);
        commit('unsetAuthenticatePending');
        return Promise.reject(error);
      });
    },
    populateUser: function populateUser(_ref, userId) {
      var commit = _ref.commit,
          state = _ref.state,
          rootState = _ref.rootState,
          dispatch = _ref.dispatch;

      return dispatch(state.userService + '/get', userId, { root: true }).then(function (user) {
        commit('setUser', user);
        return user;
      });
    },
    logout: function logout(_ref2) {
      var commit = _ref2.commit;

      commit('setLogoutPending');
      return feathersClient.logout().then(function (response) {
        commit('logout');
        commit('unsetLogoutPending');
        return response;
      }).catch(function (error) {
        return Promise.reject(error);
      });
    }
  };
}
module.exports = exports['default'];