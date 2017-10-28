<template>
  <main>
    <header-nav></header-nav>
    <section class="hero">
      <img :src="post.fields.heroImage.fields.file.url + '?fit=fill&w=500'"
           :srcset="`${post.fields.heroImage.fields.file.url}?w=500&fit=fill 500w,
                    ${post.fields.heroImage.fields.file.url}?w=960&fit=fill 960w,
                    ${post.fields.heroImage.fields.file.url}?w=1920&fit=fill 1920w`"
           sizes="100vw"
           class="">
      <h1>{{ post.fields.title }}</h1>
      <p>{{ post.fields.description }}</p>
      <!-- <p>Tags: <span v-for="tag in post.fields.tags">{{ tag }} </span></p> -->
    </section>
    <section class="content">
      <vue-markdown class="article-body">{{ post.fields.body }}</vue-markdown>
      <div class="gallery-aside">
        <div v-for="image in post.fields.gallery">
          <img :src="image.fields.file.url + '?fit=fill&w=500'"
           :srcset="`${image.fields.file.url}?w=500&fit=fill 500w,
                    ${image.fields.file.url}?w=960&fit=fill 960w,
                    ${image.fields.file.url}?w=1920&fit=fill 1920w`"
           sizes="50vw"
           class="">
          <p>{{ image.fields.title }} — {{ image.fields.description }}</p>
        </div>
      </div>
    </section>
    <footer>© Fredrik Beckius 2017</footer>
  </main>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import headerNav from '~/components/header-nav.vue'
  import {createClient} from '~/plugins/contentful.js'
  const client = createClient()

  let h = {
    vheight: ''
  }

  if (process.browser) {
    h.vheight = window.innerHeight
  }

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
      VueMarkdown,
      headerNav
    },
    data: function () {
      return {
        windowProperties: h
      }
    }
  }
</script>