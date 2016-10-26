//-------------------------------------------------------------------
// Skip Party Command.js
//-------------------------------------------------------------------
/*:
* @plugindesc Skips the Party Command entirely.
* @author Soulpour777
*
* @param EscapeString
* @desc The escape name from the command.
* @default Escape
*
* @help
//-------------------------------------------------------------------
// Skip Party Command.js
// Author: Soulpour777
// Version Number: 3
// Website: https://soulxregalia.wordpress.com/
//-------------------------------------------------------------------
*/


(function(){
    var params = PluginManager.parameters('SOUL_SkipPartyCommand');
    var escapeString = String(params['EscapeString'] || "Escape");
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        this.refreshStatus();
        this._statusWindow.deselect();
        this._statusWindow.open();
        if(BattleManager.startInput) {
            this.selectNextCommand();
        } else {
            this._partyCommandWindow.deactivate();
        }
        this.startActorCommandSelection();
    };

    Window_ActorCommand.prototype.makeCommandList = function() {
        if (this._actor) {
            this.addAttackCommand();
            this.addSkillCommands();
            this.addGuardCommand();
            this.addItemCommand();
            this.addEscapeCommand();
        }
    };

    Window_ActorCommand.prototype.addEscapeCommand = function() {
        this.addCommand(escapeString, 'escape', BattleManager.canEscape());
    }


    Scene_Battle.prototype.createActorCommandWindow = function() {
        if (!Imported.YEP_X_BattleSysCTB) {
            this._actorCommandWindow = new Window_ActorCommand();
            this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
            this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
            this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
            this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
            this._actorCommandWindow.setHandler('escape',   this.commandEscape.bind(this));
            this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
            this.addWindow(this._actorCommandWindow);  
        } else {
            this._actorCommandWindow = new Window_ActorCommand();  
            this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));  
            this._actorCommandWindow.setHandler('skill', this.commandSkill.bind(this));  
            this._actorCommandWindow.setHandler('guard', this.commandGuard.bind(this));  
            this._actorCommandWindow.setHandler('item', this.commandItem.bind(this));  
            //    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));  
            this._actorCommandWindow.setHandler('escape', this.commandEscapeActor.bind(this));  
            this.addWindow(this._actorCommandWindow);  
            this._actorCommandWindow.opacity = 150; 
        }
    };

    Scene_Battle.prototype.commandEscape = function() {
        BattleManager.processEscape();
        this.changeInputWindow();
    };

    Scene_Battle.prototype.commandEscapeActor = function() {  
        var actorIndex = BattleManager._actorIndex;  
        BattleManager.selectNextCommand();  
        BattleManager._actorIndex = actorIndex;  
        this.commandEscape();
    };

})();
