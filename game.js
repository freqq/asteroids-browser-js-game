window.onload = function () {
    Game.init();
}

VAR = {
    fps: 60,
    W: 0,
    H: 0,
    lastTime: 0,
    lastUpdate: -1,
    rand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

Game = {
    init: function () {
        Game.canvas = document.createElement('canvas');
        Game.hit_canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        Game.hit_ctx  = Game.hit_canvas.getContext('2d');
        Game.layout();

        window.addEventListener('resize', Game.layout, false);

        document.body.appendChild(Game.canvas);
        //document.body.appendChild(Game.hit_canvas);
        
        
        for (var i = 0; i < 4; i++) {
			new Rock();
		}
		
        
        Game.ship = new Ship();

        window.addEventListener('keydown', Game.onKey, false);
        window.addEventListener('keyup', Game.onKey, false);

        Game.animationLoop();
    },
    stop:function(){
        window.removeEventListener('keydown', Game.onKey, false);
        window.removeEventListener('keyup', Game.onKey, false);
    },

    onKey: function (event) {
        if (event.keyCode == 65 || event.keyCode == 32 || event.keyCode == 68 || event.keyCode == 87) {
            event.preventDefault();
            Game.key_65 = false;
            if (event.type == 'keydown' && !Game['key_' + event.keyCode]) {
                console.log(event.keyCode);
                Game['key_' + event.keyCode] = true;
                if (event.keyCode == 65) {
                    Game.key_68 = false;
                } else if (event.keyCode == 83) {
                    Game.key_87 = false;
                } else if(event.keyCode == 32){
                    new Bullet();
                }
            } else if (event.type == 'keyup') {
                Game['key_' + event.keyCode] = false;
            }
        }

    },

    layout: function (ev) {
        VAR.H = window.innerHeight;
        VAR.W = window.innerWidth;

        VAR.d = Math.min(VAR.W, VAR.H);
        Game.canvas.width = VAR.W;
        Game.canvas.height = VAR.H;
        
        Game.hit_canvas.width = VAR.W;
        Game.hit_canvas.height = VAR.H;
        Game.hit_ctx.fillStyle = 'red';

        Game.ctx.fillStyle = 'white';
        Game.ctx.strokeStyle = 'white';
        Game.ctx.lineWidth = 3;
        Game.ctx.lineJoin = 'round';
    },
    animationLoop: function (time) {
        requestAnimationFrame(Game.animationLoop);
        if (time - VAR.lastTime >= 1000 / VAR.fps) {
            VAR.lastTime = time;
            Game.ctx.clearRect(0, 0, VAR.W, VAR.H);
            Game.ship.draw();
            Rock.draw();
            Bullet.draw();
            Dot.draw();
        }
    }
}