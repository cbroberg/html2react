import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Parser } from 'html-to-react'
import { create } from 'apisauce'
import "./styles.css"

const api = create({
	baseURL: 'https://betabackend.senti.cloud',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

const NUMRETRY = 5
// const apiEndpoint = '/rest/cms/content/da/138230100010022'
const apiEndpoint = '/rest/cms/content/da/'

const apiCall = async (id, n) => {
	let response
	try {
		response = await api.get(apiEndpoint + id)
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
	state = { text: ' ' }

	componentDidMount = async () => {
		const { id } = this.props
		let response
		response = await apiCall(id, NUMRETRY)
		
		this.setState({ text: response.content })
		console.log(response)
	}
	
	render() {
		const { text } = this.state
		var htmlToReactParser = new Parser()
		var ReactElement = () => htmlToReactParser.parse(text)

		return (
			<>
				<ReactElement source={text} />
			</>
		)
	}
}

function App() {
	return (
		<div className="App">
			<h1>HTML2React</h1>
			<GetContent id={138230100010022}/>
			<GetContent id={136550100000088}/>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById("root"))

// data-pageid=\"136550100000108\"