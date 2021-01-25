<template>
  <v-card class="relic-card">
    <nuxt-link :to="'relic/' + type.id" class="nolink">
      <div class="relic-avatar" :class="['rarity-' + type.rarity]"></div>
      <div class="relic-name" v-text="type.localeName"></div>
    </nuxt-link>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";
import type { IArtifact, IArtifactType } from "~/modules/core";

@Component({})
export default class ArtifactCard extends Vue {
  @Prop() value!: IArtifact;
  @Getter("app/artifactTypes") artifactTypes!: { [id: number]: IArtifactType };

  get type() {
    return this.artifactTypes[this.value.typeId];
  }
}
</script>
