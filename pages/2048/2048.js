var app = getApp();

var Grid = require('./grid.js');
var Tile = require('./tile.js');
// var InputManager = require('./keyboard_input_manager.js');
var LocalStorageManager = require('./local_storage_manager.js');
var GameManager = require('./game_manager.js');

var config = {
    data: {
        hidden: false,

        // 游戏数据可以通过参数控制
        grids: [],
        score: 0,
        highscore: 0
    },
    onLoad: function() {
        this.GameManager = new GameManager(4, LocalStorageManager);

        this.setData({
            grids: this.GameManager.setup()
        });

        console.log('初始化数据：', this.data.grids);
    },
    onReady: function() {
        var that = this;

        // 页面渲染完毕隐藏loading
        that.setData({
            hidden: true
        });
    },
    onShow: function() {
        // 页面展示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },

    updateView: function(grids) {
        this.setData({
            grids: grids
        });
    },

    restart: function() {
        this.setData({
            grids: this.GameManager.restart()
        });
    },

    touchStartClienX: 0,
    touchStartClientY: 0,
    touchEndClientX: 0,
    touchEndClientY: 0,
    isMultiple: false, // 多手指操作

    touchStart: function(events) {

        this.isMultiple = events.touches.length > 1;
        if (this.isMultiple) {
            return;
        }

        var touch = events.touches[0];

        this.touchStartClientX = touch.clientX;
        this.touchStartClientY = touch.clientY;

    },

    touchMove: function(events) {
        var touch = events.touches[0];
        this.touchEndClientX = touch.clientX;
        this.touchEndClientY = touch.clientY;
    },

    touchEnd: function(events) {
        if (this.isMultiple) {
            return;
        }

        var dx = this.touchEndClientX - this.touchStartClientX;
        var absDx = Math.abs(dx);
        var dy = this.touchEndClientY - this.touchStartClientY;
        var absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 10) {
            var newGrids = this.GameManager.move(absDx > absDy 
                ? (dx > 0 ? 1 : 3) 
                : (dy > 0 ? 2 : 0)) 
            || this.data.grids;
            this.updateView(newGrids);

        }

    }
};

Page(config);
