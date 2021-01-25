var shootTimer
AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        this.life = 5
        shootTimer = setInterval(this.shootEnemyBullet, 10000)       
    },   
    shootEnemyBullet: function () {
        var scene = document.querySelector("#scene");

        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {
            
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            scene.appendChild(enemyBullet);

            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //set the velocity and it's direction
            var direction = new THREE.Vector3();

            direction.subVectors(position1, position2).normalize();

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));           

            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {
                    var element = document.querySelector("#countLife");
                    var playerLife = parseInt(element.getAttribute("text").value);

                    if (playerLife > 0) {
                        playerLife -= 1;
                        this.life = playerLife
                        
                        element.setAttribute("text", {
                            value: playerLife
                        });
                        if (this.life == 0) {                            
                            clearInterval(shootTimer)
                            var txt = document.querySelector("#over");
                            txt.setAttribute("visible",true);                            
                        }
                    }
                }

            });
        }

    },    

});
