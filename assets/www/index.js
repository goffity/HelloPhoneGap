Ext.setup({
	tabletStartupScreen : 'tablet_startup.png',
	phoneStartupScreen : 'phone_startup.png',
	icon : 'icon.png',
	glossOnIcon : false,
	onReady : function() {
		var timeline = new Ext.Component({
			title : 'Timeline',
			cls : 'timeline',
			scroll : 'vertical',
			html : '<div id="a">abc</div>',
			listeners : {
				render : function(c) {
					c.getEl().on('click', function() {
						alert('rrrr click');
					}, c);
				},
				activate : function() {
					Ext.Msg.alert("", "Tab geactiveerd");
				}
			}
		// addListener : function('click',){
		//				
		// }
		// initComponent: function(){
		// alert('initComponent');
		// }
		// onRender : function() {
		// alert('onrender');
		//
		// }
		// tpl : [
		// '<tpl for=".">',
		// '<div class="tweet">',
		// '<div class="avatar"><img src="{profile_image_url}" /></div>',
		// '<div class="tweet-content">',
		// '<h2>{from_user}</h2>', '<p>{text}</p>',
		// '</div>', '</div>', '</tpl>' ]
		});
		// timeline.addListener('onclick', function() {
		// alert('onclick');
		// });
		timeline.on('click', function() {
			alert('t click');
		}, this);

		var refresh = function(position) {
			alert('refresh');
			var a = document.getElementById('a');
			a.innerHTML = a.innerHTML + '<br/> abc';
			// var coords = position || map.geo.coords;
			// if (coords) {
			// map.update(coords);
			//
			// Ext.util.JSONP.request({
			// url : 'http://search.twitter.com/search.json',
			// callbackKey : 'callback',
			// params : {
			// geocode : coords.latitude + ',' + coords.longitude
			// + ',' + '5mi',
			// rpp : 30
			// },
			// callback : function(data) {
			// if (data && data.results && !!data.results.length) {
			// data = data.results;
			//
			// // Update the tweets in timeline
			// timeline.update(data);
			//
			// // Add points to the map
			// for ( var i = 0, ln = data.length; i < ln; i++) {
			// addMarker(data[i]);
			// }
			// } else {
			// timeline.getContentTarget().update(
			// 'No Results Available');
			// }
			// }
			// });
			// }
		};

		var map = new Ext.Map({
			title : 'Map',
			useCurrentLocation : true,
			mapOptions : {
				zoom : 11
			},
			listeners : {
				maprender : function(mapC, map) {
					refresh(this.geo.coords);
					this.geo.on('update', refresh);
				}
			}
		});

		var panel = new Ext.TabPanel({
			fullscreen : true,
			cardSwitchAnimation : 'slide',
			items : [ timeline, map ],
			listeners : {
				click : function() {
					alert('click');
				},
				element : timeline
			}
		});

		var markers = {};
		// These are all Google Maps APIs
		var addMarker = function(tweet, position) {

			if (markers[tweet.from_user_id]) {
				return;
			}
			position = tweet.geo ? tweet.geo.coordinates : null;
			if (!position && tweet.location) {
				var L = String(tweet.location).split(':')[1] || tweet.location;
				position = L.split(',');
			}

			if (position) {
				markers[tweet.from_user_id] = new google.maps.Marker({
					map : map.map,
					title : tweet.from_user,
					position : new google.maps.LatLng(position[0], position[1])
				});
			}
		};

		var tabBar = panel.getTabBar();
		tabBar.addDocked({
			cls : 'refreshBtn',
			xtype : 'button',
			ui : 'plain',
			iconMask : true,
			iconCls : 'refresh',
			dock : 'right',
			stretch : false,
			align : 'center',
			handler : refresh
		});
		panel.doComponentLayout();
	}
});