//http://forum.chaos-project.com/index.php?topic=15230.0
// This command runs the Function automatically without being called.
(function(){
    var params = PluginManager.parameters('SOUL_SkipPartyCommand');
    var escapeString = String(params['EscapeString'] || "Escape");
	//skip escape/fight. Skip party Command Window
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        //this.refreshStatus();
        //this._statusWindow.deselect();
        //this._statusWindow.open();
        if(BattleManager.startInput) {
            this.selectNextCommand();
        } else {
            this._partyCommandWindow.deactivate();
        }
        this.startActorCommandSelection();
    };
//=====================The Actor's Command window update=====================

    // Add New Command via 'this.addEscapeCommand'
    Window_ActorCommand.prototype.makeCommandList = function() {
        if (this._actor) {
            this.addAttackCommand();
            this.addSkillCommands();
            this.addGuardCommand();
            this.addItemCommand();
            this.addEscapeCommand();
        }
    };
	// Creates the Method 'addEscapeCommand'
    Window_ActorCommand.prototype.addEscapeCommand = function() {
        this.addCommand(escapeString, 'escape', BattleManager.canEscape());
    };

    Scene_Battle.prototype.createActorCommandWindow = function() {
        this._actorCommandWindow = new Window_ActorCommand();
        //this._actorCommandWindow.x                = 624;
        //this._actorCommandWindow.y                = 444;
        //this._actorCommandWindow.opacity          = 255;
        this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
        this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
        this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
        this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
        this._actorCommandWindow.setHandler('escape', this.commandEscape.bind(this));
        this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
        this.addWindow(this._actorCommandWindow);
    };

    // Rewrites the commandEscape method
	/*
    Scene_Battle.prototype.commandEscape = function() {
        //BattleManager.clearActor(-1, '');
        BattleManager.processEscape();
        this.changeInputWindow();
    };
	*/
//==================Finish the opening automatic Function================
})();