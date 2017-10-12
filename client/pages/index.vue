<template>
  <main>
    <!-- move to article page <p class="header__title">{{ post.fields.title }}</p> -->
    <section id="intro">
      <img class="logo" src="../assets/img/nav_logo.svg" height="" width="100%">
      <img class="profile rounded"
           :src="person.fields.image.fields.file.url + '?fit=fill&w=200'">
      <p class="intro_textbox rounded">{{ introText }}</p>
      <div class="notice rounded">
        <h2>Get in touch</h2>
        <p>Call me on +46 7 03 08 05 22</p>
        <p>Send an email to fredrik@beckius.design</p>
        <p>Or connect with me on LinkedIn</p>
      </div>
    </section>
    <section class="divider">
      <h2>Portfolio Projects</h2>
    </section>
    <section id="portfolio">
      <article-preview v-for="post in posts" :key="post.slug" :post="post"></article-preview>
    </section>
    <footer><p>(C) Fredrik Beckius 2017</p></footer>
  </main>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import articlePreview from '~/components/article-preview.vue'
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
      VueMarkdown,
      'article-preview': articlePreview
    },
    data: function () {
      return {
        'introText': "I’m a recently graduated Interaction Designer.\nWith one foot in programming and another in physical product design, my expertise lies in using my knowledge from these disciplines to achieve better results, whether I'm working with GUIs or mixed interfaces. My background consists of broad theoretical knowledge in user research and concept development, coupled with practical usage in several projects as a student, consultant or part-time employee."
      }
    }
  }
</script>
