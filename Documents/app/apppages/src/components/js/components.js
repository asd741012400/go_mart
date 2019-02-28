export default{
    setingTtitle(text){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            window.android.callAndroid(text)
        }
        if (isIOS) {
            setingTtitle(text)
        }
    }
}


