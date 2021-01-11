AFRAME.registerComponent("explosion", {
  schema: {
    id: { type: "string", default: "box" },
  },
  update: function () {
    this.boxExplosion();
  },
  boxExplosion: function () {
    if (this.data.id.includes("box")) {
      var scene = document.querySelector("#scene");

      var box = document.querySelector("#" + this.data.id);

      console.log(box);
      position = box.getAttribute("position");

      for (var i = 0; i < 6; i++) {
        var parts = document.createElement("a-entity");

        posX = position.x ;
        posY = position.y;
        posZ = position.z ;

        parts.setAttribute("position", position);
        parts.setAttribute("rotation", { x: 0, y: Math.random()*90 + (-45), z: 0 })
        parts.setAttribute("velocity", { x: 0, y: 0, z: 0 });

        parts.setAttribute("geometry", {
          primitive: "plane",
          height: 1,
          width: 1,
        });

        parts.setAttribute("material", {
          src: "./images/boxtexture1.jpg",
          repeat: "1 1 1",
        });

        parts.setAttribute("dynamic-body", {});

        parts.addEventListener("body-loaded", function () {
          setInterval(() => {
            parts.body.applyLocalImpulse(
              new CANNON.Vec3(0, 0.5, 0),
              new CANNON.Vec3().copy(parts.getAttribute("position"))
            );
          }, 0);
        });

        scene.appendChild(parts);
      }
    }
  },
});
