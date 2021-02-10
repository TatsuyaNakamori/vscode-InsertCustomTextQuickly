// ============================================================
// Copyright (c) 2021 Tatsuya Nakamori. All rights reserved.
// See LICENSE in the project root for license information.
// ============================================================

import * as vscode from 'vscode';
import * as inserttext from './InsertCustomText';


export function activate(context: vscode.ExtensionContext) {
	// registerCommand: KeyAction
	const disposable1 = vscode.commands.registerCommand("insertcustomtext.keyAction01", () => {
		inserttext.execInsertText("text.01")
	});
	const disposable2 = vscode.commands.registerCommand("insertcustomtext.keyAction02", () => {
		inserttext.execInsertText("text.02")
	});
	const disposable3 = vscode.commands.registerCommand("insertcustomtext.keyAction03", () => {
		inserttext.execInsertText("text.03")
	});
	const disposable4 = vscode.commands.registerCommand("insertcustomtext.keyAction04", () => {
		inserttext.execInsertText("text.04")
	});
	const disposable5 = vscode.commands.registerCommand("insertcustomtext.keyAction05", () => {
		inserttext.execInsertText("text.05")
	});
	const disposable6 = vscode.commands.registerCommand("insertcustomtext.keyAction06", () => {
		inserttext.execInsertText("text.06")
	});
	const disposable7 = vscode.commands.registerCommand("insertcustomtext.keyAction07", () => {
		inserttext.execInsertText("text.07")
	});
	const disposable8 = vscode.commands.registerCommand("insertcustomtext.keyAction08", () => {
		inserttext.execInsertText("text.08")
	});
	const disposable9 = vscode.commands.registerCommand("insertcustomtext.keyAction09", () => {
		inserttext.execInsertText("text.09")
	});
	const disposable0 = vscode.commands.registerCommand("insertcustomtext.keyAction10", () => {
		inserttext.execInsertText("text.10")
	});
    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable4);
    context.subscriptions.push(disposable5);
    context.subscriptions.push(disposable6);
    context.subscriptions.push(disposable7);
    context.subscriptions.push(disposable8);
    context.subscriptions.push(disposable9);
    context.subscriptions.push(disposable0);

	// onDidChangeConfiguration: KeyAction
	// inserttext.onDidChangeConfiguration(context, "text.01");
	// inserttext.onDidChangeConfiguration(context, "text.02");
	// inserttext.onDidChangeConfiguration(context, "text.03");
	// inserttext.onDidChangeConfiguration(context, "text.04");
	// inserttext.onDidChangeConfiguration(context, "text.05");
	// inserttext.onDidChangeConfiguration(context, "text.06");
	// inserttext.onDidChangeConfiguration(context, "text.07");
	// inserttext.onDidChangeConfiguration(context, "text.08");
	// inserttext.onDidChangeConfiguration(context, "text.09");
	// inserttext.onDidChangeConfiguration(context, "text.10");
}

// this method is called when your extension is deactivated
export function deactivate() {}
