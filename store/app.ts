import { GetterTree, ActionTree, MutationTree } from "vuex";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { vuexPersistenceInstance } from "~/plugins/vuex-persist";
import type { IArtifact, IArtifactType } from "~/modules/core";

const initialState = {
  user: "",
  auth: "",
  travelerGender: 0,
  artifacts: [] as IArtifact[],
  artifactTypes: {} as { [id: number]: IArtifactType },
  artifactsHash: "",
};
type AppState = typeof initialState;

export const plugins = [vuexPersistenceInstance.plugin];
export const state = (): AppState => initialState;

// 本地读写
export const mutations: MutationTree<AppState> = {
  UPDATE_TRAVELER_GENDER(state, v) {
    state.travelerGender = v;
  },
  UPDATE_AUTH(state, { user, auth }) {
    state.auth = auth;
    state.user = user;
  },
  UPDATE_ARTIFACTS(state, { v, hash }) {
    state.artifacts = v;
    state.artifactsHash = hash;
  },
  UPDATE_ARTIFACTS_TYPES(state, v) {
    state.artifactTypes = v;
  },
};

// 远端读写
export const actions: ActionTree<AppState, {}> = {
  setAuth({ commit }, auth: string) {
    if (auth.startsWith("Bearer ")) {
      const { user }: any = jwt.decode(auth.substr(7));
      commit("UPDATE_AUTH", { user, auth });
    }
  },
  // 从云端加载圣遗物
  async loadArtifacts({ commit, state }) {
    const { data } = await this.$axios.get(`/api/artifacts?h=${state.artifactsHash}`);
    if (data.code === 200) {
      commit("UPDATE_ARTIFACTS", { v: data, hash: state.artifactsHash });
    } else if (data.code !== 304) {
      console.error("load artifacts failed", data.message);
    }
  },
  async setArtifacts({ commit, state }, artifacts) {
    const old = { v: state.artifacts, hash: state.artifactsHash };
    commit("UPDATE_ARTIFACTS", { v: artifacts, hash: nanoid() });
    // 登录状态上传到云端
    if (state.auth) {
      const rst = await this.$axios.put("/api/artifacts", { artifacts }).catch(console.error);
      // 请求失败回滚
      if (!rst) commit("UPDATE_ARTIFACTS", old);
    }
  },
  setTravelerGender({ commit }, v) {
    commit("UPDATE_TRAVELER_GENDER", v);
  },
  // load content
  async nuxtServerInit({ commit } /*, { req } */) {
    const res = (await (this.$content as any)(this.$i18n.locale, "relic").fetch().catch(console.error)) as IArtifactType[];
    const idmap = res.reduce<{ [id: number]: IArtifactType }>((r, v) => (r[v.id] = v) && r, {});
    commit("UPDATE_ARTIFACTS_TYPES", idmap);
  },
};
export const getters: GetterTree<AppState, {}> = {
  travelerGender: ({ travelerGender }) => travelerGender,
  username: ({ user }) => user,
  artifacts: ({ artifacts }) => artifacts,
  artifactTypes: ({ artifactTypes }) => artifactTypes,
  artifactsHash: ({ artifactsHash }) => artifactsHash,
};
