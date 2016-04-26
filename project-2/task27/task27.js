$(function() {
    var SHIP_POWER_TYPES = [{
            velocity: 30,
            reduce: 5
        }, {
            velocity: 50,
            reduce: 7
        }, {
            velocity: 80,
            reduce: 9
        }];//can change to a function to create
    var SHIP_ENERGY_TYPES = [2, 3, 4];
    var SHIP_POWER_FULL = 100;
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
    function Ship(orbit, powerTypeId, energyTypeId) {
        if (shipCount < 4) {
            if (!shipSlot[orbit - 1]) {
                this.orbit = orbit;
                this.curPower = SHIP_POWER_FULL;
                this.powerType = SHIP_POWER_TYPES[powerTypeId];
                this.energyType = SHIP_ENERGY_TYPES[energyTypeId];
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
                self.runInt = setInterval(function(){
                    self.shipDom.css({'transform': 'rotate(' + self.position + 'deg)'});
                    $('.energy', self.shipDom).width(self.curPower/SHIP_POWER_FULL % 100*50 + 'px');
                    self.curPower -= self.powerType.reduce/10;
                    self.position += 360/self.powerType.velocity/10;
                    if ( self.curPower <= 0) {
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
                if (!!self.runInt) {
                    clearInterval(self.runInt);
                }
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
                    self.curPower += self.energyType/10;
                }
            }, 100);
        },
        destroy: function() {
            // this = null;
            console.log('destroying');
            this.shipDom.remove();
            shipSlot[this.orbit - 1] = null;
            console.log('Ship ' + this.orbit + ' destroyed!');
        },
        /*
        {
            id: 1,
            command: 'create'/stop'/'launch'/'destroy'
        }
        */
        signalRece: function(signalBi) {
            var self = this;
            function Adapter(signalBi) {
                var shipId = parseInt(signalBi.substr(0, 4), 2);
                switch (signalBi.substr(4, 7)){
                    case '0000':
                        comStr = 'create';
                        break;
                    case '0010':
                        comStr = 'stop';
                        break;
                    case '0001':
                        comStr = 'launch';
                        break;
                    case '1100':
                        comStr = 'destroy'
                        break;
                    default:
                        console.log('Wrong command!');
                        break;
                }
                return {
                    'id': shipId, 
                    'command': comStr
                };
            }
            signal = Adapter(signalBi);
            if (signal['id'] === self.orbit) {
                switch (signal['command']){
                    case 'stop':
                        self.stop();
                        break;
                    case 'launch':
                        self.launch();
                        break;
                    case 'destroy':
                        self.destroy();
                        break;
                    default:
                        console.log('wrong command!');
                        break;
                }
            }
        }
    }

    function BUS(signal) {
        function Adapter(signal) {
            var idLen = parseInt(signal['id']).toString(2).length;
            var idBi = '0000'.substr(idLen).concat(parseInt(signal['id']).toString(2));
            console.log(idBi);
            var comBi;
            switch (signal['command']){
                case 'create':
                    comBi = '0000';
                    break;
                case 'stop':
                    comBi = '0010';
                    break;
                case 'launch':
                    comBi = '0001';
                    break;
                case 'destroy':
                    comBi = '1100'
                    break;
                default:
                    console.log('Wrong command!');
                    comBi = '1111';
                    break;
            }
            return idBi + comBi;
        }
        signalBi = Adapter(signal);
        setTimeout(function(){
            var rd = Math.random();
            while(rd) {
                if (rd > 0.1) {
                    if (signal['id'] && signal['command'] === 'create') {
                        var choose = $(':checked');
                        var shipPowerTypeId = choose[0].value-1;
                        var shipEnergyTypeId = choose[1].value-1;
                        ship = new Ship(signal['id'], shipPowerTypeId, shipEnergyTypeId);
                        console.log(ship);
                        ship.recharge();
                    } else {
                        for (var i = 0; i < 4; i++) {
                            if (shipSlot[i]) {
                                shipSlot[i].signalRece(signalBi);
                            }
                            console.log('This message send!');
                        }
                    }
                    break;
                } else {
                    console.log('This message lost! Try again!');
                    rd = Math.random();
                }
            }
        }, 300);
        // console.log(shipSlot);
    }

    function bindDom(command) {
        $('.' + command).each(function(index) {
            $(this).click(function() {
                BUS({
                    'id': index + 1,
                    'command': command
                })
            });
        });
    }
    bindDom('create');
    bindDom('launch');
    bindDom('stop');
    bindDom('destroy');
});

