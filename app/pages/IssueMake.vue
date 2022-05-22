<template>
    <div class="App__page">
        <router-link class="App__back" to="/issues">
            <IconArrow class="App__back__icon" />
            {{ $t('go-back') }}
        </router-link>
        <h1 class="App__title">New Post</h1>
        <MarkdownEditor></MarkdownEditor>
        <AppLink button submit>
            {{ $t('Make new issue') }}
        </AppLink>
    </div>
</template>

<i18n>
    ko:
        search: '검색'
        go-back: '뒤로가기'
        desc: '스팍스에서 제공하는 서비스에 대한 정보를 확인할 수 있습니다.'
        reverse: '역순'
        delete-issue: '글 삭제'
</i18n>

<style scoped>
</style>

<script>
import AppLink from "@/components/AppLink";
import MarkdownEditor from "@/components/MarkdownEditor";
import IconArrow from "@/images/IconArrow.svg?inline";
export default {
    data() {
        return {
        };
    },

    methods: {
        fetchData: function () {
            axios.put('/post', { content: "", service: "" })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },

    components: {
        IconArrow,
        MarkdownEditor,
        AppLink
    }
};
</script>
