/*
一個視窗之所以能夠顯現出來，在RPG MAKER裡最主要依靠兩大架構：
Window：負責視窗本身的參數和內容
Scene：負責視窗各種運作和互動
講得簡單一點，如果視窗就是扇窗戶，
那麼Window記錄了這扇窗戶的長寬、窗框的材質、玻璃的材料等等，
而Scene記錄了窗戶怎麼左右拉、怎麼鎖住又怎麼打開，
夠明白了吧。
*/
//Window_Testing initialize
function Window_Testing() {
    this.initialize.apply(this, arguments);
}
/*
這兩句話的意思嗎(指两个Object.create)？舉Window_Testing為例，
就是Window_Testing表示：只要是Window_Selectable有的方法，我都要有啦www
這個可不是上面我們說過的「借用」而已，
你要把它想成繼承嘛也行，但看在我眼裡比較像是複製www
如果你沒加這兩句，基本上會出現找不到方法(undefined)的錯誤喔。
*/
Window_Testing.prototype = Object.create(Window_Selectable.prototype);
Window_Testing.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
}
//Scene_Testing Scene_Testing
function Scene_Testing() {
    this.initialize.apply(this, arguments);
}
Scene_Testing.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Testing.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
}
/*
Scene_Testing 除了initialize之外，還需要兩個方法：create和update。
create用於建立新的 Window_Testing 視窗，
update用於對玩家作出動作時的更新回應，例如我們接下來要寫的關閉視窗這個動作。
*/
/*
下方
一開始跟上一段一樣，從借用的地方去呼叫方法，只不過多了兩句話。
第一句話是建立一個新的Window_Testing物件，
第二句話則是將這個物件用addWindow方法顯示出來。
*/
Scene_Testing.prototype.create= function() {
	Scene_MenuBase.prototype.create.call(this);
	this._commandWindow = new Window_Testing(0, 0, 400, 200);
	this.addWindow(this._commandWindow);
}

/*
下方
這裡則是一個 if 判斷式，
系統會偵測我們的行為，如果在 Scene_Testing 這個場景按下了
鍵盤上的 ESC 或者平板上的取消鍵時，
就把我們剛剛顯示的 Window_Testing 物件，也就是我們叫出來的視窗給隱藏起來，
並且回到地圖場景上。
如果沒有這句話，那麼你只能叫出視窗，
叫出來之後就一點反應也不會有了，也不能退出XD

至於為什麼是地圖場景呢？其實你要回到哪個場景都可以，
只是因為這個範例等等要做的事情與地圖場景有關，所以先如此設定。
*/
Scene_Testing.prototype.update = function() {
	if (Input.isTriggered('escape') || Input.isTriggered('cancel')){
		this._commandWindow.hide();
		SceneManager.goto(Scene_Map);
	}
}