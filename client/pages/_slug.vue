<template>
  <main>
    <section class="hero">
      <h1>{{ post.fields.title }}</h1>
      <p class="tags">
        <span v-for="tag in post.fields.tags">{{ tag }}</span>
      </p>
      <img :src="post.fields.heroImage.fields.file.url + '?fit=fill'"
           class="">
    </section>
    <section class="content">
      <vue-markdown>{{ post.fields.body }}</vue-markdown>
    </section>
  </main>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()

  export default {
    // `env` is available in the context object
    asyncData ({ env, params }) {
      return client.getEntries({
        'content_type': env.CTF_PORTFOLIO_ITEM_TYPE_ID,
        'fields.slug': params.slug
      }).then(entries => {
        return {
          post: entries.items[0]
        }
      })
        .catch(console.error)
    },
    components: {
      VueMarkdown
    },
    data: function () {
      return {
      }
    }
  }
</script>