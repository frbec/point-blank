<template>
  <main>
    <section class="hero">
      <h1>{{ post.fields.title }}</h1>
      <p class="tags">
        <span v-for="tag in post.fields.tags">{{ tag }}</span>
      </p>
      <img :src="post.fields.heroImage.fields.file.url + '?fit=fill&w=500&h=333'"
           :srcset="`${post.fields.heroImage.fields.file.url}?w=500&h=333&fit=fill 500w,
                    ${post.fields.heroImage.fields.file.url}?w=960&h=640&fit=fill 960w,
                    ${post.fields.heroImage.fields.file.url}?w=1920&h=1280&fit=fill 1920w`"
           sizes="100vw"
           class="">
    </section>
    <section class="content">
      <vue-markdown>{{ post.fields.body }}</vue-markdown>
    </section>
    <footer>
      <p>© Fredrik Beckius 2017</p>
    </footer>
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