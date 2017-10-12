<template>
  <article>
    <img class="thumbnail"
      :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
      :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
      sizes="(min-width: 200px) 400px, 100vw"
    >
    <nuxt-link :to="{ name: 'slug', params: { slug: post.fields.slug }}" 
               class="overlay">
        <h3>{{ post.fields.title }}</h3>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: ['post']
}
</script>