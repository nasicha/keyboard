export default {
  layout: [
    { name: "Sticks",
      inputs: [
        { key: "1", value: "y", label: "Right Stick any direction", action: "Flick direction to input character (hold: open diacritics, additional symbols, etc.)" },
        { key: "2", value: "8", label: "Left Stick any direction", action: "Selection of the character group" },
        { key: "b10", value: "e", label: "Left Stick Press", action: "Shifting characters" },

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
        { key: "b9", value: "V", label: "Start", action:"Submit" },
      ]
    },
    { name: "Shoulder Buttons",
      inputs: [
        { key: "b4", value: "f", label: "Left Button", action: "Move Cursor to the left" },
        { key: "b5", value: "z", label: "Right Button", action: "Move Cursor to the right" },
        { key: "b6", value: "k", label: "Left Trigger", action: "" },
        { key: "b7", value: "b", label: "Right Trigger" },
      ],
    }
  ],
};
