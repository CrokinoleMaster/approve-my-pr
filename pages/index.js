const React = require('react')
const Octokat = require('octokat')
const username = process.env.USER_NAME
const password = process.env.PASSWORD

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries,
        split,
        i
    // Let the browser do the work
    parser.href = url
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&')
    for (i = 0; i < queries.length; i++) {
        split = queries[i].split('=')
        searchObject[split[0]] = split[1]
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeURL = this.onChangeURL.bind(this)
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
        return <input type="text" onChange={this.onChangeURL} url={url} />
    }

    onChangeURL(e) {
        this.setState({
            url: e.target.value
        })
    }
}
