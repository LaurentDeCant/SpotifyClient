function averageColor(image: HTMLImageElement) {
  const rgb = [0, 0, 0];
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 0; i < data.length; i += 4) {
      for (let j = 0; j < 3; j += 1) {
        rgb[j] = data[i + j];
      }
    }
    for (let j = 0; j < 3; j += 1) {
      rgb[j] = rgb[j] / (data.length / 4);
    }
  }

  return rgb;
}

export default averageColor;
