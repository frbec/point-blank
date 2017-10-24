let h = {
  vheight: ''
}

if (process.browser) {
  h.vheight = window.innerHeight
}

export default {
  data: function () {
    return {
      windowProperties: h
    }
  }
}