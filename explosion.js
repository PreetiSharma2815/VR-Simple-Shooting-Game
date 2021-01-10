AFRAME.registerComponent("explosion", {
  schema: {
    id: { type: "string", default: "box" },
  },
  init: function () {
    this.boxExplosion();
  },
  boxExplosion: function () {
    if (this.data.id.includes("box")) {
      var scene = document.querySelector("#scene");

      var box = document.querySelector("#" + this.data.id);

      position = box.getAttribute("position");

      for (var i = 0; i < 6; i++) {
        var parts = document.createElement("a-entity");

        posX = position.x;
        posY = position.y;
        posZ = position.z;

        parts.setAttribute("position", position);
        //parts.setAttribute("velocity", { x: Math.random() *1+-5, y: Math.random() *1+-5, z: Math.random() *1+0.5 });

        parts.setAttribute("geometry", {
          primitive: "box",
          height: 1,
          width: 0.5,
          depth: 0.1,
        });

        parts.setAttribute("material", {
          src: "./images/boxtexture1.jpg",
          repeat: "1 1 1",
        });

        parts.setAttribute("dynamic-body", {});
        // console.log(parts);

        parts.addEventListener("body-loaded", function () {
          console.log(parts.body);
          setInterval(() => {
            parts.body.applyImpulse(
              new CANNON.Vec3(0, 0, 0),
              new CANNON.Vec3().copy(parts.getAttribute("position"))
            );
          }, 0);
          console.log(parts.body);
        });
        //console.log(parts.body.velocity);
        scene.appendChild(parts);
      }
    }
  },
});
