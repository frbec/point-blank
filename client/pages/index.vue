<template>
  <main>
    <header-nav></header-nav>
    <section id="intro" class="full-page">
      <div class="container">
        <div class="top">
          <img class="logo" alt="Beckius logo" src="../assets/img/nav_logo.svg" height="68" width="324">
        </div>
        <div class="middle">
          <div class="profile desktop">
            <img class="" alt="Profile picture showing Fredrik Beckius" :src="person.fields.image.fields.file.url + '?fit=fill&w=500&h=500'">
          </div>
          <div class="divider rounded"></div>
          <p class="intro_textbox">{{ introText }}</p>
        </div>
        <div class="bottom">
          <div class="notice">
            <h2 class="color1">Get in touch</h2>
            <p class="compact-text">Call me on <span class="nowrap">+467 03 08 05 22</span><br>
              email fredrikbeckius on gmail.com<br>
              or connect with me on LinkedIn</p>
          </div>
          <img class="mobile" alt="Profile picture showing Fredrik Beckius" :src="person.fields.image.fields.file.url + '?fit=fill&w=500&h=500'">
        </div>
      </div>
    </section>
    <section id="portfolio" class="full-page">
      <div class="container">
        <h2 class="color1">Portfolio Projects</h2>
        <div class="gallery">
          <article-preview v-for="post in portfolio" :key="post.slug" :post="post"></article-preview>
        </div>
      </div>
    </section>
    <footer>© Fredrik Beckius 2017</footer>
  </main>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import articlePreview from '~/components/article-preview.vue'
  import headerNav from '~/components/header-nav.vue'
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
          'content_type': env.CTF_PORTFOLIO_ITEM_TYPE_ID,
          order: 'fields.order'
        })
      ]).then(([entries, portfolio]) => {
        // return data that should be available
        // in the template
        return {
          person: entries.items[0],
          portfolio: portfolio.items
        }
      }).catch(console.error)
    },
    components: {
      VueMarkdown,
      'article-preview': articlePreview,
      'header-nav': headerNav
    },
    data: function () {
      return {
        'introText': "I’m a recently graduated Interaction Designer.\nWith one foot in programming and another in physical product design, my expertise lies in using my knowledge from these disciplines to achieve better results, whether I'm working with GUIs or mixed interfaces. My background consists of broad theoretical knowledge in user research and concept development, coupled with practical usage in several projects as a student, consultant or part-time employee."
      }
    }
  }
</script>
