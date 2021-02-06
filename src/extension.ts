import * as vscode from 'vscode';
import { InsertCustomText } from './InsertCustomText';


export function activate(context: vscode.ExtensionContext) {
	console.log('"insertcustomtext" is now active!');

	// registerCommand: KeyAction
	let keyAction01 = new InsertCustomText(context, "insertcustomtext.keyAction01", "keyAction01.title", "keyAction.01")
	let keyAction02 = new InsertCustomText(context, "insertcustomtext.keyAction02", "keyAction02.title", "keyAction.02")
	let keyAction03 = new InsertCustomText(context, "insertcustomtext.keyAction03", "keyAction03.title", "keyAction.03")
	let keyAction04 = new InsertCustomText(context, "insertcustomtext.keyAction04", "keyAction04.title", "keyAction.04")
	let keyAction05 = new InsertCustomText(context, "insertcustomtext.keyAction05", "keyAction05.title", "keyAction.05")
	let keyAction06 = new InsertCustomText(context, "insertcustomtext.keyAction06", "keyAction06.title", "keyAction.06")
	let keyAction07 = new InsertCustomText(context, "insertcustomtext.keyAction07", "keyAction07.title", "keyAction.07")
	let keyAction08 = new InsertCustomText(context, "insertcustomtext.keyAction08", "keyAction08.title", "keyAction.08")
	let keyAction09 = new InsertCustomText(context, "insertcustomtext.keyAction09", "keyAction09.title", "keyAction.09")
	let keyAction10 = new InsertCustomText(context, "insertcustomtext.keyAction10", "keyAction10.title", "keyAction.10")

}


// this method is called when your extension is deactivated
export function deactivate() {}
