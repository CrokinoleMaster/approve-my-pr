const React = require('react')

const parseURL = require('../lib/parse-url')
const APPROVE = 'APPROVE'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeURL = this.onChangeURL.bind(this)
        this.approvePR = this.approvePR.bind(this)
        this.state = {
            url: ''
        }
    }

    static async getInitialProps({ req }) {
        return {}
    }

    render() {
        const { url } = this.state
        return (
            <section>
                <input type="text" onChange={this.onChangeURL} url={url} />
                <button onClick={this.approvePR}>APPROVE</button>
            </section>
        )
    }

    onChangeURL(e) {
        this.setState({
            url: e.target.value
        })
    }

    async approvePR() {
        const { url } = this.state
        const urlObj = parseURL(url)
        const routeParams = urlObj.pathname.replace(/^\/+|\/+$/g, '').split('/')
        if (urlObj.host !== 'github.com' || routeParams.length !== 4) {
            alert('bad url')
            return
        }
        window.fetch('http://' + window.location.hostname + ':8000/approve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                owner: routeParams[0],
                repo: routeParams[1],
                number: routeParams[3]
            })
        })
    }
}
