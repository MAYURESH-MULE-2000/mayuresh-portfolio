<script setup>
import HeroBlock from './content-blocks/HeroBlock.vue'
import OverviewBlock from './content-blocks/OverviewBlock.vue'
import TextBlock from './content-blocks/TextBlock.vue'
import ImageBlock from './content-blocks/ImageBlock.vue'
import LeftTextImageBlock from './content-blocks/LeftTextImageBlock.vue'
import RightTextImageBlock from './content-blocks/RightTextImageBlock.vue'
import ImageGridBlock from './content-blocks/ImageGridBlock.vue'
import StatsBlock from './content-blocks/StatsBlock.vue'
import NavigationBlock from './content-blocks/NavigationBlock.vue'

const props = defineProps({
    content: {
        type: Object,
        required: true
    }
})

const componentMap = {
    'text': TextBlock,
    'image': ImageBlock,
    'left-text-image': LeftTextImageBlock,
    'right-text-image': RightTextImageBlock,
    'image-grid': ImageGridBlock,
    'stats': StatsBlock,
}

const getComponent = (type) => {
    return componentMap[type] || null
}
</script>

<template>
    <div class="max-w-6xl mx-auto">
        <!-- Hero -->
        <HeroBlock backLink="/resources" backText="Back to all resources" :title="content.title"
            :category="content.category" :image="content.heroImage" />

        <!-- Overview -->
        <OverviewBlock v-if="content.overview" :sections="content.overview.sections"
            :sidebar="content.overview.sidebar" />

        <!-- Dynamic Content Blocks -->
        <component v-for="(block, index) in content.blocks" :key="index" :is="getComponent(block.type)"
            v-bind="block.data" />

        <!-- Navigation -->
        <NavigationBlock v-if="content.navigation" :prevLink="content.navigation.prev?.link"
            :prevTitle="content.navigation.prev?.title" :nextLink="content.navigation.next?.link"
            :nextTitle="content.navigation.next?.title" />
    </div>
</template>
