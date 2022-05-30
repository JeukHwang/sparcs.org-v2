<template>
    <div class="App__page">
        <router-link class="App__back" to="/issues">
            <IconArrow class="App__back__icon" />
            {{ $t('go-back') }}
        </router-link>
        <h1 class="App__title">{{ $t('make-post') }}</h1>
        <div class="LabeledInput__flex">
            <p class="LabeledInput__label"> {{ $t('title') }} </p>
            <input class="LabeledInput__box LabeledInput__textbox" type="text" required
                v-bind:placeholder="$t('write-title')" v-model="title">
        </div>
        <div class="LabeledInput__flex">
            <p class="LabeledInput__label"> {{ $t('service') }} </p>
            <select class="LabeledInput__box LabeledInput__selectbox" NAME="service" SIZE=1 v-model="selectedService">
                <option VALUE=service v-for="service in services" :key="service" :value="service"> {{ service }}
                </option>
            </select>
            <input id="customService" class="LabeledInput__box LabeledInput__textbox"
                v-bind:class="{ LabeledInput__hidden: selectedService !== 'Other' }" type="text" required
                v-bind:placeholder="$t('write-service')">
        </div>
        <SparcsHr></SparcsHr>
        <MarkdownEditor v-bind:content="content" @updateContent="updateContent"></MarkdownEditor>
        <AppLink button @click="postIssue">
            {{ $t('make-issue') }}
        </AppLink>
    </div>
</template>

<i18n>
    ko:
        search: '검색'
        go-back: '돌아가기'
        delete-issue: '게시글 삭제'
        make-issue: '게시글 생성'
        title: '제목'
        service: '서비스'
        write-title: '제목을 입력하세요'
        write-service: '서비스를 입력하세요'
        make-post: '게시글 작성'
</i18n>

<style scoped>
* {
    font-family: var(--title-font);
}

SparcsHr {
    margin: 10px 0px 0px 0px;
}

.LabeledInput {
    &__flex {
        display: flex;
        width: 100%;
    }

    &__label {
        /* display: inline-block; */
        width: 60px;
        min-width: 60px;
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

    &__textbox {
        /* width: 100%; */
        flex: 1;
        /* prevent overflow of flex items */
        min-width: 0;
    }

    &__selectbox {
        width: 100px;
        min-width: 100px;
        box-sizing: content-box;
    }

    &__hidden {
        visibility: hidden;
    }
}
</style>

<script>
import AppLink from "@/components/AppLink";
import MarkdownEditor from "@/components/MarkdownEditor";
import SparcsHr from "@/components/SparcsHr";
import IconArrow from "@/images/IconArrow.svg?inline";
import api from '@/src/api';

export default {
    data() {
        return {
            services: ['Ara', 'Geoul', 'Home',
                'Kono', 'NewAra', 'OTL',
                'SSO', 'status', 'Zabo', 'Other'],
            selectedService: "Ara",
            title: "",
            content: ""
        };
    },

    methods: {
        updateContent: function(content) {
            this.content = content;
        },

        getIssueData: function () {
            const data = {
                title: this.title.trim(),
                service: this.selectedService !== "Other" ? this.selectedService : document.getElementById("customService").value.trim(),
                content: this.content.trim()
            };
            return data;
        },

        postIssue: async function () {
            try {
                // TODO change alert into toast, hardcoded msg
                const issueData = this.getIssueData();
                const errorDict = [
                    [issueData.title === "", "문제 상황에 관한 요약을 제목으로 입력해주세요"],
                    [issueData.content === "", "문제 상황의 내용을 작성해주세요"],
                    [issueData.service === "", "문제 상황에 관련된 서비스의 이름을 작성해주세요"],
                    [issueData.service === "All", "서비스의 이름을 바꿔주세요"]
                ];
                for (const [errorExists, msg] of errorDict) {
                    if (errorExists) { alert(msg); return; }
                }
                const response = await api("post", "put", issueData);
                console.log({issueData, response});
                window.location.href = `/issue/${response.id}`;
            } catch (error) {
                alert("오류로 인해 작성된 게시글을 저장할 수 없어요");
                console.error(error);
            }
        }
    },

    components: {
        IconArrow,
        MarkdownEditor,
        AppLink,
        SparcsHr
    }
};
</script>
