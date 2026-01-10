<template>
    <div>
        <v-navigation-drawer
            v-if="nav"
            class="nav-drawer"
            :color="navColor"
            v-model="drawer"
            width="230"
            temporary
        >
            <v-list density="compact" class="py-0">
                <v-toolbar :color="navColor" class="title-tile">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="mx-1" />
                    <v-icon class="mx-0" :color="iconColor">fas fa-play-circle</v-icon>
                    <v-toolbar-title class="title ml-1 mr-5 align-center ">
                        <router-link :to="{name: 'home'}" :class="textColor">DayOneBros &nbsp;</router-link>
                    </v-toolbar-title>
                    <v-divider></v-divider>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list-item
                    v-for="item in items"
                    :key="item.text"
                    :to="{path: item.slug}"
                    class="nav-item"
                >
                    <template #prepend>
                        <v-icon>{{ item.icon }}</v-icon>
                    </template>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
                <v-divider :class="{barColor: !isHome, 'lighten-3': !isHome}"></v-divider>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            :color="navColor"
            density="comfortable"
            flat
        >
            <v-app-bar-nav-icon v-if="nav" @click.stop="drawer = !drawer" />
            <v-icon class="ml-2 mr-0 navicon" :color="iconColor">fas fa-play-circle</v-icon>
            <v-toolbar-title class="title ml-2 mr-5 align-center ">
                <router-link :to="{name: 'home'}" :class="textColor">DayOneBros &nbsp;</router-link>
                <span v-if="category" :class="textColor" class="subheading">{{category}}</span>
            </v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
    import Category from '@/mixins/category';
    export default {
        name: 'Navbar',
        mixins: [Category],
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            category: null,
            items: [
                { icon: 'trending_up', text: 'News', slug: 'news' },
                { icon: 'fas fa-laugh-squint', text: 'Comedy', slug: 'comedy' },
                { icon: 'fas fa-football-ball', text: 'Sports', slug: 'sports' },
                { icon: 'drive_eta', text: 'Auto', slug: 'auto' },
                { icon: 'audiotrack', text: 'Music', slug: 'music' },
                { icon: 'fas fa-film', text: 'Film and Animation', slug: 'film-and-animation' },
                { icon: 'videogame_asset', text: 'Gaming', slug: 'gaming' },
                { icon: 'pets', text: 'Pets', slug: 'pets' },
                { icon: 'fas fa-flask', text: 'Science', slug: 'science' },
                { icon: 'fas fa-graduation-cap', text: 'Education', slug: 'education' },
            ],
        }), 
        
        computed:{
            nav(){
                return !(this.$route.name == "terms" || this.$route.name == "copyright" ||
                this.$route.name == "privacy");
            },
            isHome(){
                return this.$route.name == "home";
            },
            textColor(){
                if(this.$route.name == "home"){
                    return 'text-black';
                } else{
                    return 'text-white';
                }
            },
            iconColor(){
                if(this.$route.name == "home"){
                    return 'red';
                } else{
                    return 'white';
                }
            },
            navColor(){
                if(this.$route.name == "home"){
                    return 'white';
                } else{
                    return 'barColor';
                }
            },
        },
    };
</script>


<style lang="scss">
.title{
    a{
        text-decoration: none;
    }
}
.nav-drawer{

    .title-tile{
        display: flex;
        flex-direction: column;
        align-content: center;
        height: 48px;
        .v-toolbar__content{
            padding: 0;
            .title{
                font-size: 16px !important;
            }
        }
    }
    .primary--text{
        background-image: none;
        color: inherit !important;
    }
}
</style>
