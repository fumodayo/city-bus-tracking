// ray-casting algorithm

export function isPointInPolygon(point, polygon) {
  var n = polygon.length,
    is_in = false,
    x = point[0],
    y = point[1],
    x1,
    x2,
    y1,
    y2

  for (var i = 0; i < n - 1; ++i) {
    x1 = polygon[i][0]
    x2 = polygon[i + 1][0]
    y1 = polygon[i][1]
    y2 = polygon[i + 1][1]

    if (y < y1 != y < y2 && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) {
      is_in = !is_in
    }
  }

  return is_in
}
