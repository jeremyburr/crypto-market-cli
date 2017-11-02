var socket = require('socket.io-client')('http://socket.coincap.io');
socket.on('connect', function(){
	console.log('connect');
});

var blessed = require('blessed')
	, contrib = require('blessed-contrib')
	, screen = blessed.screen();

var table = contrib.table(
	{ keys: true
		, vi: true
		, fg: 'white'
		, selectedFg: 'white'
		, selectedBg: 'blue'
		, interactive: true
		, label: 'Active Processes'
		, width: '100%'
		, height: '100%'
		, border: {type: "line", fg: "cyan"}
		, columnSpacing: 10
		, columnWidth: [16, 12]})

table.focus()
screen.append(table)

var prices = ['...', '...', '...', '...', '...', '...'];

socket.on('trades', function(data){ 
	switch (data.message.coin) {
		case 'BTC':
			prices[0] = data.message.msg.price;
			break;
		case 'LTC':
			prices[1] = data.message.msg.price;
			break;
		case 'ETH':
			prices[2] = data.message.msg.price;
			break;
		case 'XMR':
			prices[3] = data.message.msg.price;
			break;
		case 'ETC':
			prices[4] = data.message.msg.price;
			break;
		case 'BAT':
			prices[5] = data.message.msg.price; 
			break;
	}

	table.setData(
		{ headers: ['COIN', 'PRICE']
			, data:
			[ ['BTC', prices[0]]
				, ['LTC', prices[1]]
				, ['ETH', prices[2]]
				, ['XMR', prices[3]]
				, ['ETC', prices[4]]
				, ['BAT', prices[5]] ]})

	screen.render();
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return process.exit(0);
});

screen.render();



