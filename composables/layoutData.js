export default {
  layout: [
    { name: "Sticks",
      inputs: [
        { key: "1", value: "y", label: "Right Stick" },
        { key: "2", value: "8", label: "Left Stick" },
      ]
    },
    { name: "D-Pad",
      inputs: [
        { key: "b12", value: "O", label: "D-Pad Up" },
        { key: "b13", value: "U", label: "D-Pad Down" },
        { key: "b14", value: "P", label: "D-Pad Left" },
        { key: "b15", value: "I", label: "D-Pad Right" }
      ]
    },
    { name: "Buttons",
      inputs: [
        { key: "b0", value: ",", label: "Face Button Bottom" },
        { key: "b1", value: ".", label: "Face Button Right" },
        { key: "b2", value: "Q", label: "Face Button Left" },
        { key: "b3", value: "/", label: "Face Button Top" },
        { key: "b9", value: "V", label: "Face Button Top" },
      ]
    },
    { name: "Shoulder Buttons",
      inputs: [
        { key: "b4", value: "f", label: "Left Button" },
        { key: "b5", value: "z", label: "Right Button" },
        { key: "b6", value: "k", label: "Left Trigger" },
        { key: "b7", value: "b", label: "Right Trigger" },
      ],
    }
  ]
};
