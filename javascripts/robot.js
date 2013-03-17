var Table = function(width, height) {

	this.width = width;
	this.height = height;
	return this;

}

Table.prototype = {

	width: 5,
	height: 5,
	originx: 0,
	originy: 0

}

var Robot = function(table) {

	this.table = table;
	return this;

}

Robot.prototype = {

	x: 0,
	y: 0,
	f: 'NORTH',
	placed: false,
	table: new Table(5,5),

	place: function(x,y,f) {

		if (x >= this.table.originx && x < this.table.width)
			this.x = x;
		else
			throw new Error("Robot X position out of bounds.");

		if (y >= this.table.originy && y < this.table.height)
			this.y = y;
		else
			throw new Error("Robot Y position out of bounds.");

		if (f == 'NORTH' || f == 'SOUTH' || f == 'EAST' || f == 'WEST')
			this.f = f;
		else
			throw new Error("Robot direction not valid.");

		this.placed = true;

	},

	move: function() {

		if (!this.placed)
			return;

		switch (this.f) {

			case 'NORTH':
				if (this.y + 1 < this.table.height)
					this.y++;
				break;

			case 'SOUTH':
				if (this.y - 1 > this.table.originy)
					this.y--;
				break;

			case 'EAST':
				if (this.x + 1 < this.table.width)
					this.x++;
				break;

			case 'WEST':
				if (this.x - 1 > this.table.originx)
					this.x--;
				break;

			default:
				throw new Error("Robot direction not valid.");
				break;

		}

	},

	left: function() {

		if (!this.placed)
			return;

		switch (this.f) {

			case 'NORTH':
				this.f = 'WEST';
				break;

			case 'SOUTH':
				this.f = 'EAST';
				break;

			case 'EAST':
				this.f = 'NORTH';
				break;

			case 'WEST':
				this.f = 'SOUTH';
				break;

			default:
				throw new Error("Robot direction not valid.");
				break;

		}

	},

	right: function() {

		if (!this.placed)
			return;

		switch (this.f) {

			case 'NORTH':
				this.f = 'EAST';
				break;

			case 'SOUTH':
				this.f = 'WEST';
				break;

			case 'EAST':
				this.f = 'SOUTH';
				break;

			case 'WEST':
				this.f = 'NORTH';
				break;

			default:
				throw new Error("Robot direction not valid.");
				break;

		}

	},

	report: function() {

		this.output(this.x + ',' + this.y + ',' + this.f);

	},

	parseCommand: function(command) {

		var commandParts = command.split(" ");

		var cmdFunction = commandParts[0];
		var cmdArgs = [];

		if (commandParts.length > 1)
			cmdArgs = commandParts[1].split(",");

		switch(cmdFunction) {

			case 'PLACE':
				if (cmdArgs.length == 3)
					this.place(parseInt(cmdArgs[0]), parseInt(cmdArgs[1]), cmdArgs[2]);
				else
					throw new Error("Command arguments invalid.");
				break;

			case 'MOVE':
				this.move();
				break;

			case 'LEFT':
				this.left();
				break;

			case 'RIGHT':
				this.right();
				break;

			case 'REPORT':
				this.report();
				break;

		}

	},

	output: function(str) {
		console.log(str);
	}

}

window.onload = function() {

	var robot = new Robot(new Table(5,5));

	document.getElementById('runbtn').onclick = function() {

		var input = document.getElementById('input');
		var inval = input.value.split('\n');

		for (var i = 0; i <= inval.length - 1; i++) {
			robot.parseCommand(inval[i]);
		};

		return false;

	}

	robot.output = function(str) {

		var consolediv = document.getElementById('console');
		var logline = document.createElement('pre');
		var logtext = document.createTextNode(str);

		logline.appendChild(logtext)
		consolediv.appendChild(logline);

	}

}