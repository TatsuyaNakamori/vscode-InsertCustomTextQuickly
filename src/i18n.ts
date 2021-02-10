// ============================================================
// Copyright (c) 2021 Tatsuya Nakamori. All rights reserved.
// See LICENSE in the project root for license information.
// ============================================================

import * as vscode from 'vscode'


const i18nFiles: { [key: string]: string; } = {
    "en": "./../package.nls.json",
    "ja": "./../package.nls.ja.json"
}
const i18nData = getData();


export function localize(i18nKey: string) {
    return i18nData[i18nKey];
}

function getData() {
    // Get locale ("en", "ja", etc..)
    const locale = vscode.env.language;

    // Load [package.nls[.xx].json] file
    if (locale in i18nFiles) {
        var i18nJSON = require(i18nFiles[locale]);
    } else {
        var i18nJSON = require(i18nFiles["en"]);
    }
    return i18nJSON
}
