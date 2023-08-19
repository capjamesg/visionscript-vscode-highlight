const vscode = require('vscode');

var reference = require('./reference.json');

function activate(context) {
    let disposable = vscode.languages.registerHoverProvider('vic', {
        provideHover(document, position, token) {
            // get the word under the cursor
			var word = document.getText(document.getWordRangeAtPosition(position));
			// get the hover content
			var hoverContent = new vscode.MarkdownString("# " + word + "\n\n" + reference[word]["body"]);

            return new vscode.Hover(hoverContent);
        }
    });

    context.subscriptions.push(disposable);

    // register signature help
    let signatureHelpProvider = vscode.languages.registerSignatureHelpProvider('vic', {
        provideSignatureHelp(document, position, token) {
            // get the word under the cursor
            var word = document.getText(document.getWordRangeAtPosition(position));
            var word = word.replace(/\[|\]/g, '');
            // get the signature help content
            var signatureHelpContent = new vscode.SignatureHelp();
            signatureHelpContent.activeSignature = 0;
            signatureHelpContent.activeParameter = 0;

            var signatureParams = reference[word]["signatures"];

            // join params
            var params = signatureParams.join(", ");

            var signature = new vscode.SignatureInformation(word + "(" + params + ")", new vscode.MarkdownString(reference[word]["body"]));
            signatureHelpContent.signatures.push(signature);

            return signatureHelpContent;
        }
    }, '[', ',');

    context.subscriptions.push(signatureHelpProvider);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
