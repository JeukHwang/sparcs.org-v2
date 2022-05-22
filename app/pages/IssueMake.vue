<template>
    <div class="App__page">
        <MarkdownEditor></MarkdownEditor>
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
import MarkdownEditor from "@/components/MarkdownEditor";
export default {
    data() {
        return {
        };
    },

    components: {
        MarkdownEditor
    }
}
</script>
