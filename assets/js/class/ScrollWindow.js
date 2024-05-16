
export default class ScrollWindow {

    scrollProgress;

    getScrollProgress() {
        return this.scrollProgress;
    }

    scrollListener() {
        window.addEventListener("scroll", (e) => {
            const scrollY = window.scrollY || window.pageYOffset;
            const scrollMaxY = document.documentElement.scrollHeight - window.innerHeight;
            this.scrollProgress = scrollY / scrollMaxY;
            //console.log(this.getScrollProgress());
        });
    };



}