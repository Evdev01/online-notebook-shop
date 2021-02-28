<template>
  <div id="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">
              <router-link to="/catalog">
                Online shop
              </router-link>
            </div>
            <ul class="navbar-list">
              <li class="navbar-item" v-for="link in links" :key="link.title">
                <router-link :title="link.title" :to="link.url" class="navbar-link">
                  {{ link.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      links: [
        {title: 'Catalog', url: '/catalog'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  & a {
    color: #ffffff;
  }
}

.navbar {
  background-color: #343A40;
}

.navbar-link {
  &.router-link-exact-active {
    color: #ffffff;
  }
}
</style>










