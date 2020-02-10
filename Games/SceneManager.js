function SceneManager(){
    //1表示新手引导 2表示游戏  3 表示结算
    this.sceneNum = 1;
    game.Score = new Score();
    game.Hammer = new Hammer();
    game.Mouse = new Mouse();
    this.alertWin = document.getElementsByClassName("alertWin")[0];
    this.sceneDom = document.getElementById("scene");
    this.noticeDom = document.getElementsByClassName("notice")[0];
    this.resultDom = document.getElementsByClassName("result")[0];
    this.bindEvent();

    this.init();
}
SceneManager.prototype.init = function(){
    var startBtn = document.getElementById("startBtn");
    var self = this;
    startBtn.onclick = function(){
        self.enter(2);
    }
    var restartBtn = document.getElementById("restartBtn");
    restartBtn.onclick = function(){
        self.enter(2);
    }
    var refreshBtn = document.getElementById("refreshBtn");
    refreshBtn.onclick = function(){
        self.enter(1);
    }

   
}

SceneManager.prototype.enter = function(num){
    switch(num){
        case 1:
        //弹出消息窗口
            this.alertWin.style.display = 'block';
            this.noticeDom.style.display = 'block';
            this.resultDom.style.display = 'none';
            break;
        case 2://分数清空 时间30初始化 
            this.alertWin.style.display = 'none';
            game.Score.init();
            game.Hammer.init();
            break;
        case 3:
            game.Hammer.release();
            this.noticeDom.style.display = 'none';
            this.resultDom.style.display = 'block';
            this.alertWin.style.display = 'block';
            game.Score.gameover();
            break;
        default:
            alert("错误的场景");
            break;
    }
    this.sceneNum = num;
}

SceneManager.prototype.update = function(){
    switch(this.sceneNum){
        case 2:
        game.Score.update();
        game.Mouse.update();
        break;
    }
}

SceneManager.prototype.render = function(){
    switch(this.sceneNum){
        case 2:
        game.Score.render();
        game.Mouse.render();
        break;
    }
}

SceneManager.prototype.bindEvent = function(){
    var self = this;
    this.sceneDom.onmousemove = function(event){
        switch(self.sceneNum){
            case 2:
            game.Hammer.mousemoveHandler(event.clientX,event.clientY);
            break;
        }
    }
    this.sceneDom.onclick = function(event){
        switch(self.sceneNum){
            case 2:
            game.Mouse.clickHandler(event.clientX,event.clientY);
            break;
        }
    }
}