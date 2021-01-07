AFRAME.registerComponent("bullets", {
  schema: {
    activeBulletType: { type: "string", default: "normal" },
    bulletTypes: { type: "array", default: ["normal"] },
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      console.log(e.key)
      if (e.key === "z") {
        var weapon = document.querySelector("#weapon");
        var position = weapon.getAttribute("position");

        var bullet = document.createElement("a-entity");

        bullet.setAttribute("id", 1);
        bullet.setAttribute("material", "color", "black");
        bullet.setAttribute("position", { x: position.x, y: position.y, z:position.z });

        bullet.setAttribute("velocity", { x: 1, y: 5, z: 10 });

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 1,
        });

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });
        weapon.appendChild(bullet);
      }

      //   bullet.addEventListener("collide", e => {
      //     console.log(e)
      //   });
      //console.log(bullet)
    });
  },
  shoot: function () {},
});
