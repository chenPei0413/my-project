function Hammer() {
    this.hammerDom = document.getElementById("hammer1");
}
Hammer.prototype.init = function(){
    var self = this;
    this.hammerDom.style.display = 'block';
    this.hammerDom.onmousedown = function(){
        self.hammerDom.src = "./images/hammer2.png";
    }
    // 锤子抬起
    this.hammerDom.onmouseup = function(){
        self.hammerDom.src = "./images/hammer1.png";
    }
    this.hammerDom.onmouseout = function(){
        self.hammerDom.src = "./images/hammer1.png";
    }
}
Hammer.prototype.release = function(){
    this.hammerDom.style.display = 'none';
    this.hammerDom.onmousedown = null;
    this.hammerDom.onmouseup = null;
    this.hammerDom.onmouseout = null;
}
Hammer.prototype.mousemoveHandler = function(x,y){
    this.hammerDom.style.top = y +'px';
    this.hammerDom.style.left = x + 'px';
}