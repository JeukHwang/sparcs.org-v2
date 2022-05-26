<template>
    <div class="App__page">
        <router-link class="App__back" to="/issues">
            <IconArrow class="App__back__icon" />
            {{ $t('go-back') }}
        </router-link>
        <h1 class="App__title">{{$t('new-post')}}</h1>
        <div class="Title__flex">
            <p class="Title__category"> {{ $t('title') }} </p>
            <input class="Title__box Title__input" type="text" required v-bind:placeholder="$t('write-title')"
                v-model="writtenTitle">
        </div>
        <div class="Title__flex">
            <p class="Title__category"> {{ $t('service') }} </p>
            <select class="Title__box Title__select" NAME="service" SIZE=1 v-model="selectedService">
                <option VALUE=service v-for="service in services" :key="service" :value="service"> {{ service }}
                </option>
            </select>
            <input id="customService" class="Title__box Title__input"
                v-bind:class="{ Title__hidden: selectedService !== 'Other' }" type="text" required
                v-bind:placeholder="$t('write-service')">
        </div>
        <MarkdownEditor ref="mdEditor"></MarkdownEditor>
        <AppLink button @click="postIssue">
            {{ $t('make-issue') }}
        </AppLink>
    </div>
</template>

<i18n>
    ko:
        search: '검색'
        go-back: '뒤로가기'
        desc: '스팍스에서 제공하는 서비스에 대한 정보를 확인할 수 있습니다.'
        reverse: '역순'
        delete-issue: '이슈 삭제'
        make-issue: '이슈 생성'
        title: '제목'
        service: '서비스'
        write-title: '제목을 입력하세요'
        write-service: '서비스를 입력하세요'
        new-post: '새로운 이슈 작성'
</i18n>

<style scoped>
* {
    font-family: var(--title-font);
}

.Title {
    &__flex {
        display: flex;
        width: 100%;
    }

    &__category {
        /* display: inline-block; */
        width: 60px;
    }

    &__box {
        align-items: center;
        justify-content: center;
        padding: 10px 15px;
        margin: 5px 5px;

        border: none;
        outline: none;
        color: var(--grey-200);
        font-family: var(--title-font);
        font-size: 1.05rem;
        text-decoration: none;

        border-radius: 5px;
        cursor: pointer;
        background: var(--grey-780);
    }

    &__input {
        /* width: 100%; */
        flex: 1;
    }

    &__select {
        width: 10%;
        box-sizing: content-box;
    }

    &__hidden {
        visibility: hidden;
    }
}

MarkdownEditor {
    padding: 40px 0px;
}
</style>

<script>
import AppLink from "@/components/AppLink";
import MarkdownEditor from "@/components/MarkdownEditor";
import IconArrow from "@/images/IconArrow.svg?inline";
export default {
    data() {
        return {
            services: ['Ara', 'Geoul', 'Home',
                'Kono', 'NewAra', 'OTL',
                'SSO', 'status', 'Zabo', 'Other'],
            selectedService: "Ara",
            writtenTitle: "",
            content: ""
        };
    },

    methods: {
        getIssueData: function () {
            const data = {
                title: this.writtenTitle,
                service: this.selectedService !== "Other" ? this.selectedService : document.getElementById("customService").value,
                content: this.$refs.mdEditor.input
            };
            return data;
        },

        postIssue: function () {
            console.log(this.getIssueData());
            // axios.put('/post', this.getIssueData())
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }
    },

    components: {
        IconArrow,
        MarkdownEditor,
        AppLink
    }
};
</script>
