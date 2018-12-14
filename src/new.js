var React = require('react')
var HtmlToReact = require('html-to-react')
var HtmlToReactParser = require('html-to-react').Parser

var htmlToReactParser = new HtmlToReactParser()
// var htmlInput = '<div><div data-test="foo"><p>Text</p><p>Text</p></div></div>'
var htmlInput = '<div><a href="/dk/website/senti.htm" title="Senti" data-pageid="138230100010011">Senti.Cloud</a></div>'

var isValidNode = function () {
	return true
}

var processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React)

// Order matters. Instructions are processed in
// the order they're defined
var processingInstructions = [
	{
		// This is REQUIRED, it tells the parser
		// that we want to insert our React
		// component as a child
		replaceChildren: true,
		shouldProcessNode: function (node) {
			return node.attribs && node.attribs['data-pageid']
		},
		processNode: function (node, children, index) {
			return React.createElement('LinkTo', { key: index, }, node.attribs['data-pageid'])
		}
	},
	{
		// Anything else
		shouldProcessNode: function (node) {
			return true
		},
		processNode: processNodeDefinitions.processDefaultNode,
	},
]

var reactComponent = htmlToReactParser.parseWithInstructions(
	htmlInput, isValidNode, processingInstructions)

console.log(reactComponent)