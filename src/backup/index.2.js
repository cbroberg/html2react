import React, { Component } from "react"
import ReactDOM from "react-dom"
import "./styles.css"
import { Parser } from 'html-to-react'
import { create } from 'apisauce'

const api = create({
	baseURL: 'https://betabackend.senti.cloud',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

const apiEndpoint = '/rest/cms/content/da/138230100010022'

const apiCall = async (n) => {
	let response
	try {
		response = await api.get(apiEndpoint)
	} catch (error) {
		if (n === 1) {
			console.error(error)
		}
		response = await apiCall(n - 1)
	}
	// check response	
	if (response.ok && response.status === 200) {
		console.log('API/cms:', response.status, Date())
		return response.data
	} else {
		console.log('API/cms Error:', response.problem, Date())
	}
}

class GetContent extends Component {
	state = { text: 'Loading' }

	componentDidMount = async () => {
		let response
		response = await apiCall(1)
		
		this.setState({ text: response.content })
		console.log(response)
	}
	
	render() {
		const { text } = this.state
		var htmlToReactParser = new Parser()
		var ReactElement = () => htmlToReactParser.parse(text)

		return (
			<div>
				<ReactElement source={text} />
			</div>
		)
	}
}

var htmlInput = '<div><h1>Title</h1><p><strong>Senti</strong><span style="font-weight: 300;"> er en open source Internet of Things platform, der </span><strong>gør dig i stand til at sanse og opsamle</strong><span style="font-weight: 300;"> viden om mennesker og tilstande i dit bymæssige eller industrielle miljø.</span></p><span style="font-weight: 300;">Senti.Cloud er den </span><strong>infrastruktur</strong><span style="font-weight: 300;"> du har brug for til at opbygge, implementere og styre din portefølje af </span><strong>IoT-enheder</strong><span style="font-weight: 300;"> i stor skala.</span></div>'

var htmlToReactParser = new Parser()
var ReactElement = () => htmlToReactParser.parse(htmlInput)

function App() {
	return (
		<div className="App">
			<h1>HTML2React</h1>
			<ReactElement />
			<GetContent />
		</div>
	)
}

// ReactDOM.render(ReactElement, document.getElementById('root'))

ReactDOM.render(<App />, document.getElementById("root"))

// data-pageid=\"136550100000108\"