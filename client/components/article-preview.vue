<template>
  <article class="">
    <img class="thumbnail"
      :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=350'"
      :srcset="`${post.fields.heroImage.fields.file.url}?w=387&h=258&fit=fill 368w, ${post.fields.heroImage.fields.file.url}?w=960&h=640&fit=fill 960w, ${post.fields.heroImage.fields.file.url}?w=1920&h=1280&fit=fill 1920w`"
      sizes="(max-width: 419px) 387px, (min-width: 420px) calc(50vw-2rem), 100vw"
    >
    <nuxt-link :to="{ name: 'slug', params: { slug: post.fields.slug }}" 
               class="overlay">
      <div>
        <h4>{{ post.fields.title }}</h4>
        <p class="compact-text">{{ post.fields.description }}</p>
        <!--  <p><span v-for="tag in post.fields.tags">{{ tag }}</span></p> -->
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: ['post']
}
</script>