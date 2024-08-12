<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="mx-auto mt-5" outlined>
          <v-card-title class="headline">{{ $t('live.today_matches') }}</v-card-title>
          <v-card-text>
            <v-pagination
              v-if="totalPages > 1"
              v-model="page"
              :length="totalPages"
              @input="fetchData"
            ></v-pagination>
            <v-list dense v-if="!loading">
              <v-list-item-group>
                <v-list-item
                  v-for="fixture in fixtures"
                  :key="fixture.fixture.id"
                  class="fixture-item"
                  two-line
                >
                  <v-list-item-avatar>
                    <v-avatar size="40">
                      <v-img :src="fixture.teams.home.logo"></v-img>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="team-names">
                      <v-row align="center">
                        <v-col cols="4" class="text-right">
                          {{ fixture.teams.home.name }}
                        </v-col>
                        <v-col cols="4" class="text-center">
                          vs
                        </v-col>
                        <v-col cols="4" class="text-left">
                          {{ fixture.teams.away.name }}
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                    <v-list-item-subtitle class="match-time text-center">
                      {{ new Date(fixture.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-avatar size="40">
                      <v-img :src="fixture.teams.away.logo"></v-img>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <div v-else class="text-center mt-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <v-pagination
              v-if="totalPages > 1"
              v-model="page"
              :length="totalPages"
              @input="fetchData"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchTodayFixtures } from '@/services/leagueService';

export default {
  data() {
    return {
      fixtures: [],
      page: 1,
      limit: 5,
      totalCount: 0,
      loading: true,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCount / this.limit);
    }
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const data = await fetchTodayFixtures(this.page, this.limit);
      this.fixtures = data.response;
      this.totalCount = data.totalCount;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.fixture-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
}

.team-names {
  font-weight: bold;
  color: #1976d2;
  font-size: 1.1rem;
}

.match-time {
  color: #616161;
  font-size: 0.9rem;
}

.v-avatar {
  margin: 0 10px;
}
</style>
