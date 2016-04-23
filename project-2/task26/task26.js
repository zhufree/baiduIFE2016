$(function() {
    var SHIP_VELOCITY = 20; //means 5s round a orbit on earth;
    var SHIP_POWER_FULL = 100;
    var SHIP_POWER_REDUCE = 5; //5/s
    var SHIP_POWER_RAISE = 3; //3/s
    var SHIP_MAX = 4;
    var shipSlot = [null, null, null , null];
    var shipCount = 0;

    function createShip(ship) {
        var shipEnergy = $('<div>', {'class': 'energy'})
        var shipSelf = $('<div>', {
            'class': 'ship',
            'id': ship.orbit,
        });
        var shipPole = $('<div>', {'class': 'ship-pole'});
        shipPole.height((ship.orbit + 1) * 100 + 'px');
        shipSelf.append(shipEnergy);
        shipPole.append(shipSelf);
        return shipPole;
    }
    function Ship(orbit) {
        if (shipCount < 4) {
            if (!shipSlot[orbit - 1]) {
                this.orbit = orbit;
                this.curPower = SHIP_POWER_FULL;
                this.runStatus = false;
                this.position = (100 - this.curPower)*3.6; //0deg
                shipSlot[orbit - 1] = this;
                this.shipDom = createShip(this);
                this.shipDom.ship = this;
                $('#display').append(this.shipDom);
                console.log('Create a ship, id is ' + this.orbit);
            }
            else {
                console.log('This orbit had a ship already!');
            }
        } else {
            console.log('Cant launch more than 4 ships!');
        }
    } 

    Ship.prototype = {
        launch: function() {
            var self = this;
            if (!self.runStatus) {
                self.runStatus = true;
                console.log('Ship ' + self.orbit + ' launched!');
                runInt = setInterval(function(){
                    self.shipDom.css({'transform': 'rotate(' + self.position + 'deg)'});
                    self.curPower -= SHIP_POWER_REDUCE/10;
                    self.position += 360/SHIP_VELOCITY/10;
                    if ( self.curPower < 0) {
                        self.stop();
                    }
                }, 100);
            } else {
                console.log('Ship ' + self.orbit + ' is running!');
            }
        },
        stop: function() {
            var self = this;
            if (self.runStatus) {
                self.runStatus = false;
                clearInterval(runInt);
                console.log('Ship ' + self.orbit + ' stoped!');
            } else {
                console.log('Ship ' + self.orbit + ' is not running!');
            }
        },
        recharge: function() {
            var self = this;
            setInterval(function(){
                $('.energy', self.shipDom).width(self.curPower/SHIP_POWER_FULL % 100*50 + 'px');
                if (self.curPower < SHIP_POWER_FULL){
                    self.curPower += SHIP_POWER_RAISE/10;
                }
            }, 100);
        },
        destroy: function() {
            // this = null;
            this.shipDom.remove();
            shipSlot[this.orbit - 1] = null;
            console.log('Ship ' + this.orbit + ' destroyed!');
        },
        /*
        {
            id: 1,
            commond: 'create'/stop'/'launch'/'destroy'
        }
        */
        signalRece: function(signal) {
            if (signal['id'] === this.orbit) {
                switch (signal['commond']){
                    case 'stop':
                        this.stop();
                        break;
                    case 'launch':
                        this.launch();
                        break;
                    case 'destroy':
                        this.destroy();
                        break;
                    default:
                        console.log('wrong commond!');
                        break;
                }
            }
        }
    }

    function Mediator(signal) {
        if (signal['id'] && signal['commond'] === 'destroy') {
            shipCount -= 1;
            shipSlot[signal['id'] - 1].destroy();
        } else if (signal['id'] && signal['commond'] === 'create') {
            if (Math.random() > 0.3) {
                ship = new Ship(signal['id']);
                ship.recharge();
            } else {
                console.log('This message lost!');
            }
        } else {
            setTimeout(function(){
                for (var i = 0; i < 4; i++) {
                    if (Math.random() > 0.3 && shipSlot[i]) {
                        shipSlot[i].signalRece(signal);
                    } else {
                        console.log('This message lost!');
                    }
                };
                switch (signal['commond']){
                    case 'stop':
                        shipSlot[signal['id'] - 1].runStatus = false;
                        break;
                    case 'launch':
                        shipSlot[signal['id'] - 1].runStatus = true;
                        break;
                    case 'destroy':
                        shipSlot[signal['id'] - 1] = null;
                        break;
                    default:
                        console.log('Wrong commond!');
                        break;
                }
            }, 1000);
        }
        console.log(shipSlot);
    }

    function bindDom(commond) {
        $('.' + commond).each(function(index) {
            $(this).click(function() {
                Mediator({
                    'id': index + 1,
                    'commond': commond
                })
            });
        });
    }
    bindDom('create');
    bindDom('launch');
    bindDom('stop');
    bindDom('destroy');
});

