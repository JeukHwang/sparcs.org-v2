<template>
    <div class="App__page">
        <router-link class="App__back" to="/issues">
            <IconArrow class="App__back__icon" /> {{ $t('go-back') }}
        </router-link>

        <h1 class="title">{{ title }}</h1>
        <span> {{ service }} 작성 </span> /
        <span> {{ createdAt }} 입력 </span> /
        <span> {{ updatedAt }} 수정 </span>
        <!-- <template v-if="authLogin"> -->
        <div class="button">
            <a @click="editissue()"> {{ $t('edit-issue') }} </a>
        </div>
        <!-- </template> -->
        <!-- <template v-if="issue.canEdit"> -->
        <div class="button">
            <a @click="deleteissue()"> {{ $t('delete-issue') }} </a>
        </div>
        <!-- </template> -->

        <SparcsHr class="sparcshr"></SparcsHr>

        <MarkdownViewer :content="content"></MarkdownViewer>
    </div>
</template>

<i18n>
    ko:
        go-back: '돌아가기'
        delete-issue: '게시글 삭제'
        edit-issue: '게시글 수정'
</i18n>

<style scoped>
* {
    font-family: var(--theme-font);
}

.title {
    font-size: 2.5rem;
}

.button {
    cursor: pointer;
    display: inline-block;
    padding: 5px 12px;
    margin: 5px 5px;
    border-radius: 5px;
    background: var(--alert-level-1);
    color: var(--alert-foreground-900);
    font-family: var(--theme-font);
    text-decoration: none;
    transition: background .4s ease;

    &:hover {
        background: var(--alert-level-2);
    }
}

/* Idk how to selec */
.sparcshr {
    margin: 40px 0px;
}
</style>

<script>
import MarkdownViewer from "@/components/MarkdownViewer";
import SparcsHr from "@/components/SparcsHr.vue";
import IconArrow from "@/images/IconArrow?inline";
import api from "@/src/api";
import formatDate from "@/src/formatDate";

export default {
    data() {
        return {
            postID: this.$route.params.id,
            issue: {},
            title: "",
            service: "",
            createdAt: "",
            updatedAt: "",
            content: "",
        };
    },

    methods: {
        formatDate(date) {
            return formatDate(date);
        },

        async editissue() {
            window.location.href = `/issue/${this.postID}/edit`;
        },

        async deleteissue() {
            // TODO hardcoded string
            if (!confirm(`삭제하기 전에 고민했나요? 삭제는 되돌릴 수 없는 행동이에요`)) { return; }
            const result = await api(`/post/${this.postID}`, 'delete');
            // await this.notify(this.$t('delete-issue'), result);
        },
    },

    async mounted() {
        // TODO api error handling?
        try {
            const issue = await api(`/post/${this.postID}`, "get");
            issue.createdAt = formatDate(new Date(issue.createdAt));
            issue.updatedAt = formatDate(new Date(issue.updatedAt));
            issue.date = issue.updatedAt;
            ['title', 'service', 'createdAt', 'updatedAt', 'content'].forEach(prop => this[prop] = issue[prop]);
        } catch (error) {
            console.error(error);
            alert("게시글이 존재하지 않거나 오류가 생겨 현재 게시글을 불러올 수 없습니다");
            window.location.href = "/404"; return;
        }
    },

    created() {
        if (parseInt(this.postID) === NaN) {
            window.location.href = "/404"; return;
        }
    },

    components: {
        MarkdownViewer,
        IconArrow,
        SparcsHr
    }
};
</script>