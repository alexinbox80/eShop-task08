<template>
    <div class="header__fsearch">
        <input class="header__search-form" type="text" placeholder="Input Search Text" v-model.trim="search">
        <button class="header__search-button" @click="searchHandler">SEARCH</button>
    </div>
    <!--

     <div class="header__fsearch">
        <input class="header__search-form" type="text" placeholder="Input Search Text"
               v-model.trim="search">
        <button class="header__search-button" @click="searchHandler">SEARCH</button>
    </div>

    -->
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                search: ''
            }
        },
        methods: {
            searchHandler() {
                console.log('search');
                console.log(this.search);
                this.$store.commit('search', this.search);
                this.search = '';
            }
        }
    }
</script>

<style scoped>

</style>