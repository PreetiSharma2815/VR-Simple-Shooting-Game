AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var scene = document.querySelector("#scene");
        var cameraRig = document.querySelector("#camera-rig");
        var direction = new THREE.Vector3();
        var camera = document.querySelector("#camera").object3D;
        camera.getWorldDirection(direction);

        var position = cameraRig.getAttribute("position");

        var bullet = document.createElement("a-entity");

        bullet.setAttribute("material", "color", "black");

        bullet.setAttribute("position", {
          x: position.x,
          y: position.y + 1.3,
          z: position.z - 0.8,
        });

        bullet.setAttribute("velocity", direction.multiplyScalar(-10));

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });
        scene.appendChild(bullet);

        bullet.addEventListener("collide", this.removeBullet);
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    if (e.detail.body.el.id === "environment") {
      if (
        e.detail.target.el.body.position.z > 85 &&
        e.detail.target.el.body.position.z < -35
      ) {
        // console.log("Player has collided with body #" + e.detail.body.el.id);

        e.detail.target.el.removeEventListener("collide", this.shoot);
        var scene = document.querySelector("#scene");
        scene.removeChild(e.detail.target.el);
      }
    } else {
      // console.log("Player has collided with body #" + e.detail.body.el.id);

      //explode the box once hit
      var box = e.detail.body.el;
      box.setAttribute("material", {
        src: "./images/fire-removebg-preview.png",
        repeat: "1 1 1",
        opacity: 0.0,
        transparent: true,
      });

      box.setAttribute("explosion", {
        id: e.detail.body.el.id,
      });

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
