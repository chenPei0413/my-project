function Mouse(){
    this.id = 0;
     // 获取元素——>数组存放洞和老鼠
    this.mouseAryDom = [];
    this.hollowAryDom = [];
    for(var i =0;i<9;i++){
        this.hollowAryDom[i] = document.getElementById("hollow"+(i+1));
        this.mouseAryDom[i] = document.getElementById("mouse"+(i+1));
    }

    this.milSec = 0;
    this.UPTIME = 1000;

    this.MOVESTEP = 12;
    this.MOVEMAX = 106;
    this.moveY = this.MOVEMAX;

    this.socre = 0;
    this.oldID = -1;
}
Mouse.prototype.randomHollow = function(){
    this.id = parseInt(Math.random()*9);//生成0-8的随机数
    this.mouseAryDom[this.id].src = "./images/mouse1.png";
}
Mouse.prototype.update = function(){
    this.milSec += game.updateTime;
    if( this.milSec > this.UPTIME){
        //把之前得清理了掉，并启动新的
        this.oldID = this.id;
        this.id = parseInt(Math.random()*9);
        this.moveY = this.MOVEMAX;
        this.milSec -= this.UPTIME;

        this.socre = 1;
    }

    this.moveY -= this.MOVESTEP;
    if( this.moveY < 0){
        this.moveY = 0;
    }
}
Mouse.prototype.render = function(){
    if( this.oldID >=0 ){
        this.mouseAryDom[this.oldID].src = "./images/mouse1.png";
        this.mouseAryDom[this.oldID].style.top = this.MOVEMAX + "px";
        this.mouseAryDom[this.id].src = "./images/mouse1.png";
        
        this.oldID = -1;
    }
    if( this.id >= 0){
        this.mouseAryDom[this.id].style.top = this.moveY + "px";
    }
}
Mouse.prototype.clickHandler = function(x,y){
    y1 = this.mouseAryDom[this.id].offsetTop+this.hollowAryDom[this.id].offsetTop;
    x1 = this.mouseAryDom[this.id].offsetLeft+this.hollowAryDom[this.id].offsetLeft;
    x2 = x1+this.mouseAryDom[this.id].offsetWidth;
    y2 = y1+this.mouseAryDom[this.id].offsetHeight;
    if(x>x1&&x<x2&&y>y1&&y<y2){//打中老鼠
        this.mouseAryDom[this.id].src = "./images/mouse2.png";
        game.Score.add(this.socre);
        this.socre = 0;
        // console.log(currentscore+' '+screenscore)
        // 且得分+1
        // if(currentscore==screenscore){
        //     currentscore ++;
        //     score.innerText = currentscore; 
        // }
        
    }
}