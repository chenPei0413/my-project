function Score(){
    this.timeDom = document.getElementById("lefttime");
    this.scoreDom =document.getElementById("score");

    this.INITTIME = 30;
    this.init();
}
Score.prototype.init = function(){
    this.milsec = 0;
    this.score = 0;
    this.time = this.INITTIME;
}
Score.prototype.add = function(num){
    this.score += num;
}
Score.prototype.update = function(){
    this.milsec += game.updateTime;
    if( this.milsec > 1000){
        this.time--;
        this.milsec -= 1000;
    }
    if( this.time <= 0){
        game.SM.enter(3);
    }
}
Score.prototype.render = function(){
    this.timeDom.innerText= this.time;
    this.scoreDom.innerText = this.score;
}
Score.prototype.gameover = function(){
    var str = "";
    var starPos = 0;
    switch(this.score){
        case 0: str="你要加油了哦！目前分数有点惨呢：";
                starPos = 22*1;
                break; 
        case 1: str="你要加油了哦！目前分数有点惨呢：";
                starPos = 22*2;
                break; 
        case 2: str="你要加油了哦！目前分数有点惨呢：";
                starPos = 22*3;
                break;
        case 3: str="也算有点小收获呢，不要气馁哦！成绩为：";
                starPos = 22*4;
                break; 
        case 4: str="也算有点小收获呢，不要气馁哦！成绩为：";
                starPos = 22*5;
                break; 
        case 5: str="也算有点小收获呢，不要气馁哦！成绩为：";
                starPos = 22*6;
                break;
        case 6: str="还阔以哦！再接再厉~成绩为：";
                starPos = 22*7;
                break;
        case 7: str="哇塞，666~成绩为：";
                starPos = 22*8;
                break; 
        case 8: str="你真是个打地鼠小能手！成绩为：";
                starPos = 22*9;
                break;
        case 9: str="棒棒哒！差一点就可以全星了！成绩为：";
                starPos = 22*10;
                break;
        default:str="(●'◡'●) 天哪，太厉害了！成绩为：";
                starPos = 0;
                break;
    }
    var resultTxt = document.getElementsByClassName("result")[0].getElementsByClassName("resultNotice")[0];
    var allStar = document.getElementsByClassName("allstar")[0];
    resultTxt.innerHTML = "时间到！"+str+"<br><span>"+this.score+"</span>"+" 分~";
    allStar.style.backgroundPositionY = starPos + 'px';
}