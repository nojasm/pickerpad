# PickerPad
A small library for creating 2D input pads.

# What does it do?
With pickerpad, you can create customisable canvas based input elements that the user can interact with using their mouse.

# Using PickerPad
The PickerPad class is defined as follows: `PickerPad(parent, size, texts, options)`

- Parent is the element to put the canvas into
- Size is the x & y size for the pad. They are always equal
- Texts is either an empty list or a list with exactly 4 entries. It takes strings to display on the canvas (See examples)
- Options is a list of options. Further later.

```
var pickerPad = new PickerPad(
  document.getElementById("my_pickerpad_wrapper"),
  300,
  ["Small", "Large", "Slow", "Fast"],
  {}
)
```

# Options
`background`: Background color of the pad
`segments`: Number of segments on the pad (Only visually)
`segmentsHue`: Color for segments
`segmentsValue`: Value for segments color
`segmentsWidth`: Width of each segment line
`ringColor`: Color of ring
`ringWidth`: Width of ring if ringFill is false
`ringFill`: Boolean if ring should be filled with color
`font`: Font to use for texts (e.g. "15px Comic Sans")
`fontColor`: Color of fonts
`fontMargin`: Margin of fonts from the border

# Examples
![c1](https://user-images.githubusercontent.com/92716022/209876386-31cd2d96-8be1-4ec0-a8ad-82c1195973ee.png)
![c2](https://user-images.githubusercontent.com/92716022/209876401-8b6678c6-7432-4266-9c34-fe4df0fffcb9.png)

