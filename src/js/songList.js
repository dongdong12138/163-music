{
    let view = {
        el: '#songList-container',
        template: `
            <ul class="songList">
                <li v-for="song in songs"></li>
            </ul>
        `,
        render(data) {
            let {songs} = data
            let liList = songs.map((song) => $('<li></li>').text(song.name))
            let $el = $(this.el)
            $el.find('ul').empty()
            liList.map((domLi) => {
                $el.find('ul').append(domLi)
            })
        },
        clearActive() {
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data: {
            songs: [{id: 1, name: '1'}, {id: 2, name: '2'}]
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('upload', () => {
                this.view.clearActive()
            })
            window.eventHub.on('create', (data) => {
                this.model.data.push(data)
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view, model)
}