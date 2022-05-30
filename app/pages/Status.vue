<template>
    <div class="App__page">
        <router-link class="App__back" to="/">
            <IconArrow class="App__back__icon" />{{ $t('go-back') }}
        </router-link>
        <h1 class="Tab">Status | <a class="Tab__unselected" href="./issues">Issues</a></h1>
        <p class="Info__desc">{{ $t('desc') }}</p>

        <div class="Grid__container">
            <div class="Grid__item Service" v-for="service in services" :key="service.name">
                <div class="Service__status">
                    <a class="Service__status__a" :href="service.link"> <img class="Service__status__logo"
                            :src="service.image"> </a>
                </div>
                <div class="Service__about" v-if="service.tags">
                    <span class="Service__about__tag" :class="'Service__about__tag__' + tag.toLowerCase()"
                        v-for="tag in service.tags" :key="tag" :force="force"> ● {{ tag }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<i18n>
    ko:
        search: '검색'
        go-back: '돌아가기'
        desc: '스팍스에서 운영하는 서비스의 상태를 실시간으로 알려드려요.'
        reverse: '역순'
</i18n>

<style scoped>
* {
    font-family: var(--theme-font);
}

a {
    text-decoration: none;
}

.Grid {
    &__container {
        width: 100%;
        display: grid;
        gap: 20px 40px;
        grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
        place-content: stretch stretch;
        justify-items: center;
    }

    &__item {
        width: min(100%, 80vw);
        min-width: 300px;
        height: max(fit-content, 10vh);
        color: var(--theme-foreground-900);
        font-family: var(--theme-font);
        margin: 20px 0px;
        padding: 30px;
        border-radius: 5px;
        box-sizing: border-box;
        box-shadow: var(--shadow-500);
    }
}

.Service {
    display: flex;
    color: var(--grey-200);
    border-spacing: 10px;
    gap: 0px 10px;

    &__status {
        flex: 6;
        /* width: 100%; */
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;

        justify-content: flex-start;
        align-items: center;

        &__a,
        &__logo {
            height: 50px;
        }
    }

    &__about {
        width: 50%;
        flex: 4;
        /* width: 0; */
        /* margin-left: 10px; */
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        &__tag {
            max-width: 100%;
            display: flex;
            align-items: center;

            font-family: var(--theme-font);
            color: var(--grey-650);

            &__operational {
                color: green;
            }

            &__inoperational {
                color: red;
            }

            &__development {
                color: orange;
            }
        }
    }
}


.Tab {
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    margin: 5px 5px;
    border: none;
    outline: none;
    color: var(--grey-200);
    border-radius: 5px;

    &__unselected {
        text-decoration: none;
        color: grey;
        font-size: 0.8em;
    }
}

@media (max-width: 500px) {
    .Service {
        flex-direction: column;
    }
}
</style>

<script>
import AppCheckbox from "@/components/AppCheckbox";
import AppInput from "@/components/AppInput";
import AppLink from "@/components/AppLink";
import TheSeminarUpload from "@/components/TheSeminarUpload";
import IconArrow from "@/images/IconArrow?inline";
import IconGithub from "@/images/IconGithub?inline";
import IconSortDate from "@/images/IconSortDate?inline";
import IconSortTitle from "@/images/IconSortTitle?inline";
import ServiceAra from "@/images/ServiceAra";
import ServiceGeoul from "@/images/ServiceGeoul";
import ServiceHome from "@/images/ServiceHome";
import ServiceKono from "@/images/ServiceKono";
import ServiceNewAra from "@/images/ServiceNewAra";
import ServiceOTL from "@/images/ServiceOTL";
import ServiceSSO from "@/images/ServiceSSO";
import ServiceZabo from "@/images/ServiceZabo";



export default {
    data() {
        return {
            issues: [],
            sortMode: 'date',
            sortReverse: true,
            query: '',
            year: (new Date()).getFullYear(),
            service: "All",
            services: [
                {
                    name: 'Ara',
                    desc: 'service-ara',
                    image: ServiceAra,
                    link: 'https://ara.kaist.ac.kr',
                    github: ['arara']
                },

                {
                    name: 'Geoul',
                    desc: 'service-geoul',
                    image: ServiceGeoul,
                    link: 'http://ftp.kaist.ac.kr',
                    github: ['ftp.kaist.ac.kr']
                },

                {
                    name: 'Home',
                    desc: 'service-home',
                    image: ServiceHome,
                    link: 'https://sparcs.org',
                    github: ['sparcs.org-v2']
                },

                {
                    name: 'Kono',
                    desc: 'service-kono',
                    image: ServiceKono,
                    link: 'https://kono.sparcs.org',
                    github: ['kono'],
                },

                {
                    name: 'NewAra',
                    desc: 'service-newara',
                    image: ServiceNewAra,
                    link: 'https://newara.sparcs.org',
                    github: ['new-ara-api', 'new-ara-web']
                },

                {
                    name: 'OTL',
                    desc: 'service-otl',
                    image: ServiceOTL,
                    link: 'https://otl.kaist.ac.kr',
                    github: ['otlplus'],
                },

                {
                    name: 'SSO',
                    desc: 'service-sso',
                    image: ServiceSSO,
                    link: 'https://sparcssso.kaist.ac.kr',
                    github: ['sparcssso']
                },

                // {
                //     name: 'status',
                //     desc: 'service-status',
                //     image: ServiceStatus,
                //     link: 'https://status.sparcs.org',
                //     github: ['status-page']
                // },

                {
                    name: 'Zabo',
                    desc: 'service-zabo',
                    image: ServiceZabo,
                    link: 'https://zabo.sparcs.org',
                    github: ['zabo-front-reactjs', 'zabo-server-nodejs']
                }
            ]
                .map(service => {
                    service.tags = ["Loading..."];
                    return service;
                })
            ,
            force: 0
        };
    },

    mounted() {
        let eventSource = new EventSource('http://3.39.230.113:3000/status/info');
        eventSource.onopen = (event) => { console.log("Connected"); };
        eventSource.onmessage = (event) => {
            let data = JSON.parse(event.data);
            // console.log({data});
            this.services.forEach((s) => {
                let name = s.name.toLowerCase();
                switch (data[name]) {
                    case "operational":
                        s.tags = ["Operational"];
                        break;
                    case "inoperational":
                        s.tags = ["Inoperational"];
                        break;
                    default:
                        s.tags = ["Unknown"];
                        break;
                }
                if (name === "ara") { // Just for presentation
                    switch (data["random"]) {
                        case "operational":
                            s.tags = ["Operational"];
                            break;
                        case "inoperational":
                            s.tags = ["Inoperational"];
                            break;
                        default:
                            s.tags = ["Unknown"];
                            break;
                    }
                }
            });
            this.updateForce();
        };
        eventSource.onerror = (event) => {
            console.error('eventsourceError', event);
            eventSource.close();
        };
    },

    methods: {
        updateForce() {
            this.force = (this.force + 1) % 100;
        },
        updateTag(serviceName, tags) {
            this.$set(this.services[serviceName].tags, tags, true);
            this.$set(this.services, this.services, true);
            // this.services[serviceName].tags = tags;
        }
    },

    components: {
        AppLink,
        IconGithub,

        AppCheckbox,
        AppInput,
        IconArrow,
        IconSortDate,
        IconSortTitle,
        TheSeminarUpload
    },
};
</script>