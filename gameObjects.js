AFRAME.registerComponent("boxes", {
  schema: {
    height: { type: "number", default: 1 },
    width: { type: "number", default: 1 },
    depth: { type: "number", default: 1 },
  },
  init: function () {
    var sceneEl = document.querySelector("#scene");
    px = [
      22.86859601111223,
      -17.35477886020567,
      -12.815958572687078,
      0.443783122425881,
      -30.186342592689089,
      -25.896987242194509,
      15.619230989928518,
      29.684615678794735,
      11.95050923285828,
      -15.40710771205853,
      -14.092220373342691,
      34.76992320906499,
      2.299257902690698,
      21.776471163893724,
      1.579492388469028,
      34.724762327504585,
      12.049770854380824,
      -10.908380218945823,
      6.488057628380975,
      15.664759961894191,
    ];

    pz = [
      54.56236498778466,
      -4.716063051094174,
      14.911873602827292,
      56.74742157052073,
      41.13679603529346,
      50.76716951466531,
      57.84588681153484,
      7.023021948345438,
      -5.2475458567351225,
      -26.827228431957412,
      27.598522317947484,
      -35.789696809968653,
      34.52900813109474,
      31.32251813097176,
      -9.223660779068261,
      26.72979488394232,
      48.90105193671124,
      27.24006210689354,
      9.941805121615957,
      54.29865958366045,
    ];
    for (var i = 0; i < 20; i++) {
      var box = document.createElement("a-entity");

      posX = px[i];
      posY = 1.5;
      posZ = pz[i];

      position = { x: posX, y: posY, z: posZ };

      box.setAttribute("id", "box"+i);
      box.setAttribute("position", position);

      box.setAttribute("geometry", {
        primitive: "box",
        height: this.data.height,
        width: this.data.width,
        depth: this.data.depth,
      });

      box.setAttribute("material", {
        src: "./images/boxtexture1.jpg",
        repeat: "1 1 1",
      });

      box.setAttribute("static-body", {});

      sceneEl.appendChild(box);
    }
  },
});

AFRAME.registerComponent("wire-fence", {
  schema: {
    height: { type: "number", default: 1 },
    width: { type: "number", default: 1 },
    depth: { type: "number", default: 1 },
  },
  init: function () {
    var sceneEl = document.querySelector("#scene");

    posX = -20;
    posZ = 85;
    for (var i = 0; i < 10; i++) {
      var wireFence = document.createElement("a-entity");
      var wireFence1 = document.createElement("a-entity");
      var wireFence2 = document.createElement("a-entity");
      var wireFence3 = document.createElement("a-entity");

      posX = posX + 5;
      posY = 2.5;
      posZ = posZ - 10;

      scale = { x: 2, y: 2, z: 2 };

      wireFence.setAttribute("position", { x: posX, y: 2.5, z: 85 });
      wireFence.setAttribute("scale", scale);
      wireFence.setAttribute(
        "gltf-model",
        "./models/barbed_wire_fence/scene.gltf"
      );

      wireFence1.setAttribute("position", { x: posX, y: 2.5, z: -35 });
      wireFence1.setAttribute("scale", scale);
      wireFence1.setAttribute(
        "gltf-model",
        "./models/barbed_wire_fence/scene.gltf"
      );

      wireFence2.setAttribute("position", { x: -30, y: 2.5, z: posZ });
      wireFence2.setAttribute("scale", scale);
      wireFence2.setAttribute(
        "gltf-model",
        "./models/barbed_wire_fence/scene.gltf"
      );
      wireFence2.setAttribute("rotation", { x: 0, y: 90, z: 0 });

      wireFence3.setAttribute("position", { x: 50, y: 2.5, z: posZ });
      wireFence3.setAttribute("scale", scale);
      wireFence3.setAttribute(
        "gltf-model",
        "./models/barbed_wire_fence/scene.gltf"
      );
      wireFence3.setAttribute("rotation", { x: 0, y: 90, z: 0 });

      wireFence.setAttribute("static-body", {});
      wireFence1.setAttribute("static-body", {});
      wireFence2.setAttribute("static-body", {});
      wireFence3.setAttribute("static-body", {});

      wireFence.setAttribute("id", "wireFence"+i);
      wireFence1.setAttribute("id", "wireFence1"+i);
      wireFence2.setAttribute("id", "wireFence2"+i);
      wireFence3.setAttribute("id", "wireFence3"+i);

      sceneEl.appendChild(wireFence);
      sceneEl.appendChild(wireFence1);
      sceneEl.appendChild(wireFence2);
      sceneEl.appendChild(wireFence3);
    }
  },
});
