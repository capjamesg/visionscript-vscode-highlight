const vscode = require('vscode');

var reference = require('./reference.json');

console.log(reference);

function activate(context) {
    let disposable = vscode.languages.registerHoverProvider('vic', {
        provideHover(document, position, token) {
            // Your hover content logic here
			// write to debug console
			console.log("Hovering over " + document.getText(document.getWordRangeAtPosition(position)));
			// get the word under the cursor
			var word = document.getText(document.getWordRangeAtPosition(position));
			// get the hover content
			var hoverContent = new vscode.MarkdownString(reference[word]);

            return new vscode.Hover(hoverContent);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
