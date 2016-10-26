/*********************************************************************
 * Kiwa's Custom Battle Windows                                      *
 * KiwasCustomBattleWindows.js                                       *
 * Version 1.0                                                       *
 *********************************************************************/
 /*:
  *@plugindesc Changes the Combat Menu position.
  *@author Kiwa
  *@version 1.2
**********************************************************************/

// This command runs the Function automatically without being called.
 (function() {
/***************************************************************************
* We are going to overwrite methods that have inharitade from object to   *
* object. The order of the inharitance is as follows:                     *
*                                                                         *
* Window.js < Window_Base.js < Window_Selectable.js < Window_SkillList.js *
* < Window_BattleSkill.js                                                 *
*                                                                         *
* These methods already exist. RPG maker will run them before running     *
* the plugins. By typing them again they will overwrite the old methods   *
***************************************************************************/
//======================Skip party Command Window===============================



//=======================Battle Status Window Size==============================

  // Window Width
  Window_BattleStatus.prototype.windowWidth = function() {
    return  624;
  };

// Window Height
  Window_BattleStatus.prototype.windowHeight = function() {
  return this.fittingHeight(this.numVisibleRows());
  };

//==========================Enemy Select Window Size.===========================

  // Window Width
  Window_BattleEnemy.prototype.windowWidth = function() {
  return 624;
  };

  // Window Height
  Window_BattleEnemy.prototype.windowHeight = function() {
  return this.fittingHeight(this.numVisibleRows());
  };
//============================Party Command List================================

  // Window Width
  Window_PartyCommand.prototype.windowWidth = function() {
      return 192;
  };
  Window_PartyCommand.prototype.numVisibleRows = function() {
    return 4;
  }

//==========================Player Command Window===============================

  // Window Width
  Window_ActorCommand.prototype.windowWidth = function() {
    return 192;
  };

  // Visible Selectable Command Rows
  Window_ActorCommand.prototype.numVisibleRows = function() {
    return 4;
  };


//======================Battle Status Window Position=========================

  // Refreshes the window.
  Scene_Battle.prototype.updateWindowPositions = function() {
    /*var statusX = 0;
    if (BattleManager.isInputting()) {
        statusX = this._partyCommandWindow.width;
    } else {
        statusX = this._partyCommandWindow.width / 2;
    }
    if (this._statusWindow.x < statusX) {
        this._statusWindow.x += 16;
        if (this._statusWindow.x > statusX) {
            this._statusWindow.x = statusX;
        }
    }
    if (this._statusWindow.x > statusX) {
        this._statusWindow.x -= 16;
        if (this._statusWindow.x < statusX) {
            this._statusWindow.x = statusX;
        }
    } */
      this._statusWindow.x       = 190;
      this._statusWindow.y       = 0;
      this._statusWindow.opacity = 0;
      };

//==================Create the Player's action select window===================

  // Creates the Actor's window.
  Scene_Battle.prototype.createActorWindow = function() {
    this._actorWindow = new Window_BattleActor(0, this._statusWindow.y);
    this._actorWindow.opacity           = 255;
    this._actorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
    this.addWindow(this._actorWindow);
    };

//========================The party's Command window============================

  //Skip Party Command Window
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

  //Party Command Window Position
  Scene_Battle.prototype.createPartyCommandWindow = function() {
    this._partyCommandWindow = new Window_PartyCommand();
    this._partyCommandWindow.x                 = 624;
    this._partyCommandWindow.y                 = 444;
    this._partyCommandWindow.opacity           = 255;
    this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
    this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
    this._partyCommandWindow.deselect();
    this.addWindow(this._partyCommandWindow);
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
      this.addCommand('Escape', 'escape', BattleManager.canEscape());
  }

  Scene_Battle.prototype.createActorCommandWindow = function() {
    this._actorCommandWindow = new Window_ActorCommand();
    this._actorCommandWindow.x                = 624;
    this._actorCommandWindow.y                = 444;
    this._actorCommandWindow.opacity          = 255;
    this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
    this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
    this._actorCommandWindow.setHandler('escape',   this.commandEscape.bind(this));
    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
    this.addWindow(this._actorCommandWindow);
  };

  // Rewrites the commandEscape method
  Scene_Battle.prototype.commandEscape = function() {
      BattleManager.clearActor(-1, '');
      BattleManager.processEscape();
      this.changeInputWindow();
};

//=================Creates the Enemie choice window Position===================

  Scene_Battle.prototype.createEnemyWindow = function() {
    this._enemyWindow  = new Window_BattleEnemy(0, this._statusWindow.y);
    this._enemyWindow.Opacity          = 255;
    this._enemyWindow.setHandler('ok',     this.onEnemyOk.bind(this));
    this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
    this.addWindow(this._enemyWindow);
  };

//=========================The Skill window position===========================

  Scene_Battle.prototype.createSkillWindow = function() {
    this._skillWindow = new Window_BattleSkill(192, 0, 180, 624); // (x, y, h, w)
    this._skillWindow.opacity          = 255;
    this._skillWindow.x                = 0;
    this._skillWindow.y                = 100;
    this._skillWindow.width            = 816;
    this._skillWindow.height           = 525;
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
    this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
    this.addWindow(this._skillWindow);
  };

//===================The Item window size and position=========================
  Scene_Battle.prototype.createItemWindow = function() {
    this._itemWindow = new Window_BattleItem(192, 0, 180, 624); //(x, y, h, w)
    this._itemWindow.x                = 0;
    this._itemWindow.y                = 100;
    this._itemWindow.width            = 816;
    this._itemWindow.height           = 525;
    this._itemWindow.opacity          = 255;
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
  };

//=======================Create the Help window================================
  Scene_Battle.prototype.createHelpWindow = function(){
    this._helpWindow = new Window_Help();
    this._helpWindow.x                = 0;
    this._helpWindow.y                = 0;
    this._helpWindow.height           = 100;
    this._helpWindow.width            = 816;
    this._helpWindow.opacity          = 255;
    this._helpWindow.visible          = false;
    this.addWindow(this._helpWindow);
  };

//=====================Log window Position and size============================
  Scene_Battle.prototype.createLogWindow = function() {
    this._logWindow = new Window_BattleLog();
    this._logWindow.x                = 0;
    this._logWindow.y                = 444;
    this._logWindow.height           = 100;
    this._logWindow.width            = 816;
    this._logWindow.opacity          = 255;
    this._logWindow.visible          = false;
    this.addWindow(this._logWindow);
  };

//==================Finish the opening automatic Function================
 })();