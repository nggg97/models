// ==UserScript==
// @name 碧蓝幻想提醒
// @version 0.0.1
// @description 无
// @icon http://game.granbluefantasy.jp/favicon.ico
// @author ngaer
// @match *://game.granbluefantasy.jp/*
// @match *://gbf.game.mbga.jp/*
// @run-at document-end
// @grant GM_notification
// ==/UserScript==
(function () {
'use strict'

const send = (title) => {
GM_notification({
title,
text: '看看看看看一下',
silent: true,
timeout: 10000,
})
}

window.addEventListener('hashchange', () => {
if (/^#result(_multi)?\/\d/.test(location.hash)) {
$(document).ajaxSuccess((event, xhr, settings, data) => {
if (/\/result(multi)?\/content\/index\/\d+/.test(settings.url)) {
const result_data = data.option.result_data
if (result_data.appearance?.is_quest || result_data.replicard?.has_occurred_event){
window.location.replace(`https://game.granbluefantasy.jp/#${result_data.url}`);
} else {
//跳转到剪贴板url(
navigator.clipboard
.readText()
.then((clipText) => (window.location.replace(clipText)));
}
}
}
)
}
}
)
}())
