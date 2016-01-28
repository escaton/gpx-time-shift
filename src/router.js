import Router from 'ampersand-router'
import React from 'react'
import StartUpPage from './pages/startup'

export default Router.extend({
    renderPage (page) {
        React.render(page, document.body)
    },

    routes: {
        '': 'startup'
    },

    startup () {
        console.log('startup page')
        this.renderPage(<StartUpPage/>, {layout: false})
    }
})
