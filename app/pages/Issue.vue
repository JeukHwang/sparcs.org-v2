<template>
    <div class="App__page">
        <router-link class="App__back" to="/issues">
            <IconArrow class="App__back__icon" /> {{ $t('go-back') }}
        </router-link>
        <MarkdownViewer :content="md"></MarkdownViewer>
    </div>
</template>

<i18n>
    ko:
        go-back: '뒤로가기'
</i18n>

<style scoped>
</style>

<script>
import MarkdownViewer from "@/components/MarkdownViewer";
import IconArrow from "@/images/IconArrow?inline";
export default {
    data() {
        return {
            postID: this.$route.params.id,
        };
    },

    computed: {
        md() {
            const postExists = parseInt(this.postID) !== NaN && 0 < parseInt(this.postID) && parseInt(this.postID) < 500;
            if (!postExists) {
                this.$router.push('/404');
                return "# No such post";
            } else {
                return `# ID : ${this.postID}
- Help
- Me
- Plz`;
            }
        }
    },

    components: {
        MarkdownViewer,
        IconArrow
    }
};
</script>
