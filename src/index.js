import React from "react"
import ReactDOM from "react-dom"
import "./styles.css"
import { Parser } from 'html-to-react'

var htmlInput = '<div><h1>Title</h1><p><strong>Senti</strong><span style="font-weight: 300;"> er en open source Internet of Things platform, der </span><strong>gør dig i stand til at sanse og opsamle</strong><span style="font-weight: 300;"> viden om mennesker og tilstande i dit bymæssige eller industrielle miljø.</span></p><span style="font-weight: 300;">Senti.Cloud er den </span><strong>infrastruktur</strong><span style="font-weight: 300;"> du har brug for til at opbygge, implementere og styre din portefølje af </span><strong>IoT-enheder</strong><span style="font-weight: 300;"> i stor skala.</span></div>'

var htmlToReactParser = new Parser()
var ReactElement = () => htmlToReactParser.parse(htmlInput)

function App() {
	return (
		<div className="App">
			<h1>HTML2React</h1>
			<ReactElement />
		</div>
	)
}

// ReactDOM.render(ReactElement, document.getElementById('root'))

ReactDOM.render(<App />, document.getElementById("root"))

// data-pageid=\"136550100000108\"