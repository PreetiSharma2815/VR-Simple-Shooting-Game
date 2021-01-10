AFRAME.registerComponent("player-movement", {
  init: function () {
    this.jump();
    this.walk();
  },
  walk: function () {
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown"
      ) {
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
      }
    });
  },
  jump: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        var scene = document.querySelector("#scene");
        var cameraRig = document.querySelector("#camera-rig");
        var position = cameraRig.getAttribute("position");

        var direction = { x: 0, y: 5, z: 0 };
        cameraRig.setAttribute("velocity", direction);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        var scene = document.querySelector("#scene");
        var cameraRig = document.querySelector("#camera-rig");

        var position = cameraRig.getAttribute("position");

        if (!position.y) {
          var direction = { x: 0, y: -1, z: 0 };
          cameraRig.setAttribute("velocity", direction);
        }
      }
    });
  },
});
