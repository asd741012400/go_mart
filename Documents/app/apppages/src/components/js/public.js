export const open_sweep = ( str ) => {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        window.android.openQRScan()
    }
    if (isIOS) {
        window.webkit.messageHandlers.openSweep.postMessage(str)
    }
}
export const open_album = ( str ) => {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        window.android.openAlbum( str )
    }
    if (isIOS) {
        window.webkit.messageHandlers.openAlbum.postMessage( str )
    }
}




