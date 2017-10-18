const React = require('react')
const Octokat = require('octokat')

const parseURL = require('../lib/parse-url')
const username = process.env.USER_NAME
const password = process.env.PASSWORD

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
        const octo = new Octokat({
            username,
            password
        })
        return {
            octo
        }
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

    approvePR() {
        const { octo } = this.props
        const { url } = this.state
        const urlObj = parseURL(url)
        console.log(urlObj)
    }
}
