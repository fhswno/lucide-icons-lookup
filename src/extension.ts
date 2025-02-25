import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Register the command
  let disposable = vscode.commands.registerCommand(
    "lucide-icons-lookup.search",
    async () => {
      // Prompt user for a search term
      const searchTerm = await vscode.window.showInputBox({
        placeHolder: "Enter a search term for Lucide Icons (e.g., camera)",
        prompt: "Type a term to search Lucide Icons",
        ignoreFocusOut: true, // Keeps the input box open if focus shifts
      });

      // If a search term is provided, create and show the webview
      if (searchTerm) {
        const panel = vscode.window.createWebviewPanel(
          "lucideIconsSearch", // Unique identifier for the webview
          `Lucide Icons: ${searchTerm}`, // Title of the webview tab
          vscode.ViewColumn.One, // Open in the active editor column
          {
            enableScripts: true, // Allow scripts for the iframe content
          }
        );

        // Set the webview HTML with an iframe pointing to the Lucide search URL
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Lucide Icons Search</title>
        </head>
        <body style="margin: 0; padding: 0; overflow: hidden;">
          <iframe 
            src="https://lucide.dev/icons/?search=${encodedSearchTerm}" 
            style="width: 100%; height: 100vh; border: none;" 
            sandbox="allow-scripts allow-same-origin">
          </iframe>
        </body>
        </html>
      `;
      }
    }
  );

  // Add the command to the extension's subscriptions so it’s cleaned up on deactivation
  context.subscriptions.push(disposable);
}

// Deactivation function (optional for now)
export function deactivate() {}
