<template>
  <main>
    <p class="header__title">{{ post.fields.title }}</p>
    <section class="container intro">
      <h1>Design portfolio and stuff</h1>
      <p>Hej och välkommen till min fina sida</p>
    </section>
    <section class="container portfolio">
      <article v-for="post in posts" :key="post.slug" class="flex__item portfolio__item">
        <div class="content"><h2>{{ post.fields.title }}</h2></div>
      </article>
    </section>
    <section class="flex__container topics">Some other topics</section>
  </main>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()

  export default {
    // `env` is available in the context object
    asyncData ({env}) {
      return Promise.all([
        // fetch the owner of the blog
        client.getEntries({
          'sys.id': env.CTF_PERSON_ID
        }),
        // fetch all blog posts sorted by creation date
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          order: '-sys.createdAt'
        })
      ]).then(([entries, posts]) => {
        // return data that should be available
        // in the template
        return {
          person: entries.items[0],
          posts: posts.items
        }
      }).catch(console.error)
    },
    components: {
      VueMarkdown
    }
  }
</script>
