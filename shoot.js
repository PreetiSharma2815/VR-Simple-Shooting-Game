var nextLevel = "index.html"
AFRAME.registerComponent("bullets", {

  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var scene = document.querySelector("#scene");
        var cameraRig = document.querySelector("#camera-rig");
        var position = cameraRig.getAttribute("position");

        var bullet = document.createElement("a-entity");
        bullet.setAttribute("material", "color", "black");

        bullet.setAttribute("position", {
          x: position.x,
          y: position.y + 1.3,
          z: position.z - 0.8,
        });

        //set the velocity and it's direction
        var direction = new THREE.Vector3();
        var camera = document.querySelector("#camera").object3D;
        camera.getWorldDirection(direction);

        bullet.setAttribute("velocity", direction.multiplyScalar(-10));

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        scene.appendChild(bullet);

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        bullet.addEventListener("collide", this.removeBullet);

        //shooting sound
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    console.log(e.detail.body.el.id)

    if (e.detail.body.el.id === "environment") {
      if (
        e.detail.target.el.body.position.z > 85 &&
        e.detail.target.el.body.position.z < -30
      ) {
        e.detail.target.el.removeEventListener("collide", this.shoot);
        var scene = document.querySelector("#scene");
        scene.removeChild(e.detail.target.el);
      }
    }
    else {
      //apply force on the enemy tank once hit      
      if (e.detail.body.el.id.includes("enemy")) {

        var elementHit = e.detail.body.el;

        elementHit.setAttribute("dynamic-body", {
         mass:200,
        });

        var impulse = new CANNON.Vec3(0, 0, 2);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );

        elementHit.body.applyImpulse(impulse, worldPoint);

        var tankDestroyed = document.querySelector("#" + e.detail.body.el.id);
        tankDestroyed.setAttribute("class", "destroyed");        

        var element = document.querySelector("#countTank");
        var tanksFired = parseInt(element.getAttribute("text").value);
        tanksFired -= 1;
        
        element.setAttribute("text", {
          value: tanksFired
        });

        if (tanksFired === 0) {          
          location.href = nextLevel;
        }
      }
      //remove event listener
      e.detail.target.el.removeEventListener("collide", this.shoot);

      //remove the bullets from the scene
      var scene = document.querySelector("#scene");
      scene.removeChild(e.detail.target.el);
    }
  },
  shootSound: function () {
    var entity = document.querySelector("#sound2");
    entity.components.sound.playSound();
  },
});
